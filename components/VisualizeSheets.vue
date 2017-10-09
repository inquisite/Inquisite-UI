<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			Displaying data with type <select name="showType" v-model="showType" v-on:change="updateDataGrid"><option v-for="(h,x) in dataTypes" :value="h.id">{{h.code}}</option></select> from <em>{{activeRepo.name}}</em>
		 </div>
        <div class="card-block" style="display:flex; overflow-x: auto; height: 600px;">
            <div id="datagrid"></div>
        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default { 
  name: 'visualize-data-sheets',
  data: function() {
    return {
      state: this.$store.state,
      showType: this.$store.getters['schema/getDefaultDataType']
    }
  },
  mounted: function() {
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']);
  },
  computed: { 
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
    data: function() { return this.$store.getters['data/getData']; },
    headers: function() { return this.$store.getters['data/getDataHeaders']; }
  },
  methods: {
    updateDataGrid: function() {
        if (this.showType >0) {
          this.$store.dispatch('data/getDataForType', {"repo_id": this.activeRepo.id, "type": this.showType, "datagrid": "datagrid"});
        }
    }
  }
}
</script>