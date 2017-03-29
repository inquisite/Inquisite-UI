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
       
         <p>Displaying Data Sheet for {{sharedState.active_repo.name}} </p> 
         <div v-html="dataTable" style="display:flex; overflow-x: auto;"></div>

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
  computed: { 
    dataTable: function() {

        var html = '<table class="table">';

        html += "<tr>";
        var key;
        for(key in store.state.active_repo.data[0]) {
          html += "<th>" + key + "</th>";  
        }

        html + "</tr>";

        for(var idx = 0; idx <= store.state.active_repo.data.length; idx++) {
        
          html += "<tr>";
          for(key in store.state.active_repo.data[idx]) {
            html += "<td>" + store.state.active_repo.data[idx][key] + "</td>";
          }
          html += "</tr>";

        }

        html += '</table>';

        return html;
    }
  },
  methods: {} 
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
