<template>
<div id="import-history">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			    Users
		    </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
              <div class="row">
                    <ul>
                      
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
  name: 'admin-users',
  data: {
      
  },
  mounted: function() {
    this.getImportHistory();
  },
  computed: {
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
  }, 
  methods: {
    
  } 
}
</script>