<template>
<div id="import-history">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			    Import history for <em>{{activeRepo.name}}</em>
		    </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
              <div class="row">
                    <ul>
                      <li v-for="e in importHistory">Imported file <em>{{e.original_filename}}</em> 
                      ({{e.size_display}}; {{e.filetype}}) 
                        at {{e.started_on}} as {{e.rows}} items of type <em>{{e.type}}</em></li>
                    </ul>
              </div>
        </div>  
      </div>
    </div>
  </div>
</div>


</template>

<script>
export default { 
  name: 'import-history',
  data: {
      
  },
  mounted: function() {
    this.getImportHistory();
  },
  computed: {
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    importHistory: function() { return this.$store.getters['data/getImportEvents']; }
  }, 
  methods: {
    getImportHistory: function() {
      var self = this;
      this.$store.dispatch("data/importEventsForRepo", { "repo_id": this.activeRepo['id']}).then(function(response) {
       //self.importHistory = response;
       console.log("ZZZ", response);
      });
    }
  } 
}
</script>