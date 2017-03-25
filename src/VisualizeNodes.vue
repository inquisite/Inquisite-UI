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
      <div class="panel">
        <div class="panel-body">
       
         <p> Displaying nodes for {{sharedState.active_repo.name}} </p> 
          

         <div>DATA :{{sharedState.active_repo.data}}</div>
            
         <table class="table">
           <tr v-for="(item, index) in sharedState.active_repo.data">
             <th v-for="(key, value) in item">{{key}}</th>

             <td>{{value}}</td>
           </tr>
         </table>




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
      sharedState: store.state,
    }
  },
  created: function() {
    this.getDataNodes()
  },
  methods: {
    getDataNodes: function() {

        setTimeout(function() { 
           console.log(' .. wait .. Repo ID: ' + store.state.active_repo.id);
           store.dispatch('getDataNodes', { token: store.state.token, data: { repo_id: store.state.active_repo.id }}) }, 1500);
        
    }  
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
