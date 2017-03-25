<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <h1>Visualize Data Sheets</h1>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="panel">
        <div class="panel-body">
       
         <p> Displaying Data Sheet for {{sharedState.active_repo.name}} </p> 
          

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
  name: 'visualize-data-sheets',
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
      store.dispatch('getDataNodes', { data: { repo_id: store.state.active_repo.id }});
    }  
  } 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
