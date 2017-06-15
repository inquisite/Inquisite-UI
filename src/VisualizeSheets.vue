<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">

        <div class="pull-right">
          <a @click="exportRepo()">
            <button type="button" class="btn btn-info"><i class="fa fa-download" aria-hidden="true"></i>Export Repository</button>
          </a>
        </div>

        <h1>Visualize Data Sheets</h1>

      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-block">
       

          

         <p>Displaying Data Sheet for {{sharedState.active_repo.name}} </p> 
         <!--<div v-html="dataTable" style="display:flex; overflow-x: auto;"></div>-->


         <div class="clusterize">

           <table class="table"> <!-- style="display: flex; overflow-x: auto;">-->
             <thead style="display: table-header-group"><tr v-html="headers"></tr></thead>
           </table>

            <div id="scrollArea" class="clusterize-scroll">
             <table class="table table-striped"> <!-- style="display: flex; overflow-x: auto;">-->
               <tbody id="contentArea" class="clusterize-content" v-html="rows">
               </tbody>
             </table>
           </div>

         </div>

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>

import store from './store.js'
import Clusterize from 'clusterize.js'

export default { 
  name: 'visualize-data-sheets',
  data: function() {
    return {
      sharedState: store.state,
    }
  },
  mounted: function() {

      var clusterize = new Clusterize({
        scrollId: 'scrollArea',
        contentId: 'contentArea'
      })
  },
  computed: { 

    headers: function() {

        var headers = ''
        var key;
        for(key in store.state.active_repo.data[0]) {
          headers += "<th>" + key + "</th>";
        }

        return headers
    },
    rows: function() {

      var rw = '';
      var key;
      var data_rows = [];

      for(var idx = 0; idx < store.state.active_repo.data.length; idx++) {

        rw = "<tr>";
        for(key in store.state.active_repo.data[idx]) {
          if(store.state.active_repo.data[idx].hasOwnProperty(key)) {
            rw += "<td>" + store.state.active_repo.data[idx][key] + "</td>";
          } 
        } 

        rw += "<tr/>";

        data_rows.push( rw );
      }

      return data_rows;
    },
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
