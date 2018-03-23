
<template>
<div id="export-data">
    <div class="row">
        <div class="col-12 col-sm-6 offset-sm-3">
            <div class="card card-form">
                <div class="card-header text-center">
                    Export Data
                </div>
                <div class="card-block">
                    <flashmessage/>
                    <div class="card-block">
                        <form id="export-form" name="export-form" method="POST" action="">
                            <div class="row" v-if="export_info">
                                <div class="col-12">
                                    <h6>Source: {{export_source}} ({{export_type}})</h6>
                                    <h6>Record Count: {{export_count}}</h6>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="name" class="col-2 col-form-label">Filename</label>
                                <div class="col-10">
                                    <input class="form-control" id="exportfile" name="exportfile" placeholder="Export File" v-model="export_name">
                                    <small class="form-text text-muted">{{tip}}</small>
                                    <small id="exportHelp" class="form-text text-muted">Name your data export file.</small>
                                </div>
                            </div>
                            <div class="item" style="padding: 10px 0">
                                <button v-on:submit.prevent="exportData" v-on:click.prevent="exportData" :disabled="!allow_export" class="btn btn-primary">Export</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
  name: 'export-data',
  data: function() {
    return {
      repo: null,
      schema: null,
      records: [],
      export_name: '',
      export_source: '',
      export_type: '',
      export_count: 0,
      export_info: false,
      allow_export: false,
      tip: ''
    }
  },
  props: [
    "repo_id",
    "schema_id"
  ],
  watch: {
      export_name: function(new_name, old_name){
          this.tip = "Make sure to end your filename with .json"
          this.verifyExportName();
      }
  },
  mounted: function(){
      if(this.repo_id && !this.schema_id){
          this.repo = jQuery.extend({}, this.$store.getters['repos/getRepoByID'](this.repo_id));
          this.export_source = this.repo.name;
          this.export_count = this.repo.data_element_count;
          this.export_type = "Repository";
      } else if(this.schema_id){
          console.log("EXPORT SCHEMA", this.schema_id);
      } else {
          console.log("EXPORT DATA");
      }
      this.$store.dispatch('export_data/createExportSource', {"type": this.export_type, "source": this.repo_id})
      this.export_info = true;
  },
  methods: {
      verifyExportName: function(){
          if(this.export_info){
              if(this.export_name && this.export_name.indexOf(' ') < 0 && this.export_name.substring(this.export_name.length - 5) == '.json'){
                  this.tip = "Looks good!";
                  this.allow_export = true;
                  return true;
              }
          }
          this.allow_export = false;
      },
      exportData: function(){
          this.$store.dispatch('export_data/generateExport').then(function(response){
              console.log(response);
          });
      }
  }
}
</script>
