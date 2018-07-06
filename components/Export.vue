
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
                    <div class="card-block" v-if="export_count > 0">
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
                        <div class="row">
                            <div class="col-12" v-if="download_complete">
                                <small>Your file should download automatically, if not please click <a id="download-link" :href="download_url" :download="export_name">here</a></small>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card-block">
                        <div class="row">
                            <div class="col-12 text-center">
                                <h2>No Records available for export</h2>
                            </div>
                        </div>
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
      download_complete: false,
      download_url: '',
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
  computed: {
      userInfo: function(){
          return this.$store.getters['people/getUserInfo'];
      }
  },
  mounted: function(){
      var source_id = null;
      var user_name = this.userInfo.email;
      if(this.repo_id && !this.schema_id){
          source_id = this.repo_id
          this.repo = jQuery.extend({}, this.$store.getters['repos/getRepoByID'](this.repo_id));
          this.export_source = this.repo.name;
          this.export_count = this.repo.data_element_count;
          this.$store.dispatch('export_data/storeExportInfo', [this.export_source, user_name]);
          this.export_type = "Repository";
          this.records = [];
      } else if(this.schema_id){
          source_id = this.schema_id;
          var self = this;
          this.$store.dispatch('schema/getDataType', this.schema_id).then(function(response){
             self.schema = response;
             self.export_source = response['name'];
             self.export_count = response['data_count'];
             self.$store.dispatch('export_data/storeExportInfo', [self.export_source, user_name]);
          });
          this.export_type = "Schema";
          this.records = [];
      } else {
          this.records = this.$store.getters['export_data/getExportRecords'];
          this.export_type = "Records";
          this.export_source = "Search";
          this.export_count = this.records.length;
      }
      this.$store.dispatch('export_data/createExportSource', {"type": this.export_type, "repo": this.repo_id, "schema": this.schema_id, "records": JSON.stringify(this.records)})
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
          var self = this;
          this.$store.dispatch('export_data/generateExport', self.export_name).then(function(response){
              self.download_url = response.href;
              self.download_complete = true;
          });
      }
  }
}
</script>
