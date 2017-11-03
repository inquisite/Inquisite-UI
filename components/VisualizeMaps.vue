<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-2">
      <h3>Map from</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="k, v in dataTypes">
          <h5>{{k.name}}</h5>
          <ul class="list-group">
            <li class="list-group-item" v-for="kf, vf in k.fields" v-if="kf.type == 'GeorefDataType'" v-on:click="updateMap">
              <h6>{{kf.name}}</h6>
              <div class="small" v-for="kf, vf in k.fields" v-if="kf.type != 'GeorefDataType'"><input type="checkbox" v-model="displayFields" :value="kf.code" v-on:click="updateMap"/> {{kf.name}}</div>
            </li>
          </ul>
        </li>
      </ul>

    </div>
    <div class="col-sm-10">
      <div class="card card-gray">
        <div class="card-header">
			    Map from <em>{{activeRepo.name}}</em>
		    </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
            <div id="map" style="width: 100%; height: 500px;">
              <v-map :zoom=13 :center="getMapCenter">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                <v-marker-cluster>
                  <v-marker v-if="points.length > 0" :lat-lng="points"></v-marker>
                  <v-polygon v-if="polygons.length > 0" v-for="p, i in polygons" :lat-lngs="p"><v-popup :content="polygonLabels[i]"></v-popup></v-polygon>
                </v-marker-cluster>
              </v-map>
            </div>
        </div>  
      </div>
    </div>
  </div>
</div>
</template>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
<script>
export default { 
  name: 'visualize-data-maps',
  data: function() {
    return {
      showType: null,
      displayFields: []
    }
  },
  mounted: function() {
    var self = this;
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']).then(function() {
        self.showType = self.$store.getters['schema/getDefaultDataType'];
        self.loadMap();

        var t = self.dataTypes.filter((v) => v.id == self.showType);
        if (t[0]) {
          self.displayFields = [t[0]["fields"][0]["code"]];
        }
    });
  },
  computed: { 
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
    data: function() { return this.$store.getters['data/getData']; },
    coords: function() {
      var d = this.data;

      var count = 0;
      var coords = {"polygons": [], "polygon_labels": [], "points": [], "point_labels": []};
      for(var i in d) {
        if (d[i] && d[i]['coordinates']) {
            // TODO: improve perforamnce and remove limit
            if (count > 3000) break;
            var c = JSON.parse(d[i]['coordinates']);
            if (c['coordinates']) {
              count++;

              switch(c['type']) {
                case "Polygon":
                  for(var g in c['coordinates']) {
                    var p = [];
                    for(var cs in c['coordinates'][g]) {
                      // flip long/lat (GeoJSON) to lat/long (Leaflet)
                      p.push([c['coordinates'][g][cs][1], c['coordinates'][g][cs][0]])    
                    }
                    coords["polygons"].push(p);
                    coords["polygon_labels"].push(Object.keys(d[i]).filter(key => key !== 'coordinates')
                      .reduce((obj, key) => { obj[key] = d[i][key]; return obj; }, {}));

                  }
                  break;
                case "Point":
                  for(var g in c['coordinates']) {
                    for(var cs in c['coordinates'][g]) {
                      // flip long/lat (GeoJSON) to lat/long (Leaflet)
                      coords["points"].push([c['coordinates'][g][cs][1], c['coordinates'][g][cs][0]])    
                    }
                  }
                  break;
              }
            }
        }
      }

      return coords;
    },
    getMapCenter: function() {
      // TODO: get actual center 
      var c = this.coords["polygons"];
      if (!c || !c[0] || !c[0][0]) { return [0,0]; }
      return c[0][0];
    },
    points: function() {
      var c = this.coords;
      return c["points"];
    },
    polygons: function() {
      var c = this.coords;
      return c["polygons"];
    },
    polygonLabels: function() {
      var self = this;
      var c = this.coords;
      var display_fields = this.displayFields;
      return c["polygon_labels"].map((v, i) => {
        var field_values = [];
        for(var f in display_fields) {
          var t = self.dataTypes.filter((v) => v.id == self.showType);
          var l = t[0]["fields"].filter((v) => v.code === display_fields[f]);
          var field_label = (l && l[0]) ? l[0].name : "???";
          field_values.push(field_label + ": " + v[display_fields[f]]); 
        }
        return field_values.join("<br/>\n");
      });
    }
  },
  methods: {
    loadMap: function() {
        if (this.showType >0) {
            var self = this;
            this.$store.dispatch('data/getDataForType', {"repo_id": this.activeRepo.id, "type": this.showType}).then(function() {
                console.log("Render map with", self.$store.getters['data/getData']);
            });
        }
    },
    updateMap: function() {

    }
  }
}
</script>