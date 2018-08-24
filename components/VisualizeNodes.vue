<template>
<div id="visualize-data-nodes">
  <div class="row">
	<div class="col-sm-12">
	  <div class="card card-gray">
		<div class="card-header">
			Data Network from <em>{{activeRepo.name}}</em>
		 </div>
		<div class="card-body" style="display:flex; overflow-x: auto;">
			<div class="svg-container" :style="{width: settings.width + '%'}">
	            <svg id="svg" pointer-events="all" viewBox="0 0 960 600" preserveAspectRatio="xMinYMin meet">
	                <g :id="links"></g>
	                <g :id="nodes"></g>
					<g :id="text"></g>
	            </svg>
	        </div>
		</div>
	  </div>
	</div>
  </div>
</div>

</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'visualize-data-nodes',
  data: function() {
	return {
		graph: null,
		simulation: null,
		settings: {
			width: 100,
			svgWidth: 960,
			svgHeight: 500
		}
	}
  },
  mounted: function() {
	  this.plotRepo();
  },
  computed: {
	activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
	dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
	nodes: function() {
		var self = this;
		if(self.graph){
			return d3.select("svg").append("g")
				.attr("class", "nodes")
				.selectAll("circle")
				.data(self.graph.nodes)
				.enter().append("circle")
				.attr("r", function(d) {
					if(d.type == 'repo'){
						return 45;
					} else if(d.type == 'datatype'){
						return 30;
					} else {
                        return 15;
                    }
				})
				.attr("stroke", "none")
				.attr("fill", function(d){
                    if(d.type == 'repo'){
                        return '#54b15c'
                    } else if (d.type == 'datatype'){
                        return '#e0462f'
                    } else {
                        return '#e49ae1'
                    }
                })
                .on("mouseover", function(d){
                    self.tooltip.html(d.text);
                    return self.tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){
                    return self.tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){
                    return self.tooltip.style("visibility", "hidden");
                })
				.call(d3.drag()
					.on("start", function dragstarted(d) {
						if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
						d.fx = d.x;
						d.fy = d.y;
					})
					.on("drag", function dragged(d) {
						d.fx = d3.event.x;
						d.fy = d3.event.y;
					})
					.on("end", function dragended(d) {
						if (!d3.event.active) self.simulation.alphaTarget(0);
						d.fx = null;
						d.fy = null;
					}));
		}
	},
	links: function() {
		var self = this;
		if(self.graph){
			return d3.select("svg").append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(self.graph.links)
			.enter().append("line")
			.attr("stroke-width", function (d) { return Math.sqrt(d.value); });
		}
	},
	text: function() {
		var self = this;
		if(self.graph){
			return d3.select("svg").append("g")
			.attr("class", "text")
			.selectAll("text")
			.data(self.graph.nodes)
			.enter().append("text")
			.text(function(d){ return d.name})
			.style("font-size", '12px')
            .attr("text-anchor", "middle")
            .attr("dy", 3)
		}
	},
    tooltip: function(){
        var self = this;
        if(self.graph){
            return d3.select("body")
                .append("div")
                .attr("class", "d3tip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden");
        }
    }
  },
  methods: {
	  plotRepo(){
          var self = this;
		  this.getNodes().then(function(result){
             self.graph = result;
             self.simulation = d3.forceSimulation(self.graph.nodes)
   		  	     .force("link", d3.forceLink(self.graph.links).id(function(d){ return d.id; }).distance(50).strength(0.3))
   			     .force("charge", d3.forceManyBody())
   			     .force("center", d3.forceCenter(self.settings.svgWidth / 2, self.settings.svgHeight / 2));
          });

	  },
	  getNodes(){
          var self = this
          return new Promise(function(resolve, reject){
              var localGraph = {"nodes": [], "links": []}
              var repoDisplay = '';
              repoDisplay += "<strong>Name</strong><br/>" + self.activeRepo['name'] + "<br/>";
              if(self.activeRepo['URL']){
                  repoDisplay += "<strong>URL</strong><br/>" + self.activeRepo['URL'] + "<br/>";
              }
              if(self.activeRepo['license']){
                  repoDisplay += "<strong>License</strong><br/>" + self.activeRepo['license'] + "<br/>";
              }
              if(self.activeRepo['readme']){
                  repoDisplay += "<strong>Description</strong><br/>" + self.activeRepo['readme'] + "<br/>";
              }
              var repo = {
    			  "id": 'repo_'+self.activeRepo.id,
    			  "name": self.activeRepo.name,
    			  "type": "repo",
                  "text": repoDisplay
    		  }
    		  localGraph['nodes'].push(repo);
              var typeCount = self.dataTypes.length;
              var typePos = 0;
    		  for(var i = 0; i < self.dataTypes.length; i++){
    			  var type = self.dataTypes[i];
                  var typeDisplay = '';
                  typeDisplay += '<strong>Name</strong><br/>' + type['name'] + '<br/>';
                  if(type['description']){
                      typeDisplay += "<strong>Description</strong><br/>" + type['description'] + "<br/>";
                  }
                  typeDisplay += '<strong>Fields</strong><br/>';
                  for(var k = 0; k < type.fields.length; k++){
                      var field = type.fields[k];
                      typeDisplay += field['name'] + ' (' + field['type'] + ')'
                      if(k < (type.fields.length -1)){
                          typeDisplay += '<br/>';
                      }
                  }
                  typeDisplay += '\n';

    			  var dataType = {
    				  "id": 'type_'+type.id,
    				  "name": type.name,
    				  "type": "datatype",
                      "text": typeDisplay
    			  }
    			  localGraph['nodes'].push(dataType)
    			  localGraph['links'].push({"source": repo.id, "target": 'type_'+type.id})
                  var getData = {
                      "repo_id": self.activeRepo.id,
                      "type": type.id,
                      "start": 0,
                      "limit": type.size
                  }
                  let typeID = 'type_' + type.id;
                  self.$store.dispatch("data/getDataForType", getData).then(function(resp){
                     for(var j = 0; j < resp.data.length; j++){
                         var data = resp.data[j];
                         var dataText = '';
                         var fieldCount = Object.keys(data).length;
                         var fieldPos = 0;
                         for (var field in data){
                             if(field == 'id' || field == 'uuid'){
                                 continue;
                             }
                             dataText += '<strong>' + field + '</strong><br/>' + data[field] + '<br/>';
                             fieldPos++;
                             if(fieldPos > 9){
                                 dataText += '<hr/><strong>Plus ' + (fieldCount-9).toString() + " More Fields</strong><br/>";
                                 break;
                             }
                         }
                         var dataNode = {
                             "id": data.uuid,
                             "type": "data",
                             "name": "Data",
                             "text": dataText
                         }
                         localGraph['nodes'].push(dataNode);
                         localGraph['links'].push({"source": typeID, "target": dataNode.id});
                     }
                     typePos++;
                     if(typePos >= typeCount){
                       resolve(localGraph);
                     }
                  });
    		  }
          });
	  }
  },
  updated: function () {
	  var self = this;
	  self.simulation.nodes(self.graph.nodes).on('tick', function ticked() {
		  self.links
		  	.attr("x1", function (d) { return d.source.x; })
	        .attr("y1", function (d) { return d.source.y; })
	        .attr("x2", function (d) { return d.target.x; })
	        .attr("y2", function (d) { return d.target.y; });
	      self.nodes
	        .attr("cx", function (d) { return d.x; })
	        .attr("cy", function (d) { return d.y; });
	      self.text
  	        .attr("x", function (d) { return d.x; })
  	        .attr("y", function (d) { return d.y; });
	  });
  }
}
</script>
