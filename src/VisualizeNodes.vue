<template>
<div id="visualize-data-nodes">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Visualize Data Nodes</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-block">
       
         <p> Displaying nodes for {{activeRepo.name}} </p> 
       


          
         <div id="carousel" class="carousel slide" data-ride="carousel">
       
           <!-- indicators -->
           <ol class="carousel-indicators">
             <li data-target="#carousel" data-slide-to="0" class="active"></li> 
             <li data-target="#carousel" data-slide-to="1"></li> 
             <li data-target="#carousel" data-slide-to="2"></li> 
           </ol>
 


           <!-- slides -->
           <div class="carousel-inner" role="listbox" v-html="nodesData"></div>
             
           </div>  

           <!-- Controls -->
           <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
             <i class="fa fa-chevron-left" aria-hidden="true"></i>
             <span class="sr-only">Previous</span>
           </a>

           <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
             <i class="fa fa-chevron-rifgr" aria-hidden="true"></i>
             <span class="sr-only">Next</span>
           </a>

         </div>
         




        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>

import store from './store.js'

export default { 
  name: 'visualize-data-nodes',
  data: function() {
    return {
        state: store.state
    }
  },
  
  computed: {
	activeRepo: function() { return store.state.active_repo; },
    nodesData: function() {
    
      var html = ""
   
      for(var i = 0; i < store.state.active_repo.data.length; i++) {

        var item_class = "item";
        if(i == 0) {
          item_class = "item active";
        }

        html += '<div class="' + item_class + '">' 
        for(var attr in store.state.active_repo.data[i]) {
          html += '<div>' + attr + ': ' + store.state.active_repo.data[i][attr] + '</div>'
        }
        html += '</div>'
      }

      return html;
    }
  },
  methods: {} 
}
</script>