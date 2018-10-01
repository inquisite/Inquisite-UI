<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			Displaying data with type <select name="showType" v-model="showType" v-on:change="updateDataGrid"><option v-for="(h,x) in dataTypes" :value="h.id">{{h.code}}</option></select> from <em>{{activeRepo.name}}</em>

      <div class="pull-right"  style="color:white;" v-if="isSaving"><i class="fa fa-cog fa-spin fa-fw"></i> Saving...</div>
		 </div>
        <div class="card-body" style="display:flex; overflow-x: auto;">
            <HotTable ref="datagrid" style="height: 600px;"
                :root="datagrid" :data="data"
                :columns="colspec" :colWidths="200" :colHeaders="colheaders" :rowHeaders="true" :columnSorting="true" :sortIndicator="true" 
                :onAfterChange="handleEdit"
                v-if="showDataGrid"></HotTable>
        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
 import HotTable from 'vue-handsontable-official';

export default { 
  name: 'visualize-data-sheets',
  data: function() {
    return {
      state: this.$store.state,
      showType: null,
      showDataGrid: false,
      isSaving: false
    }
  },
  computed: { 
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    dataTypes: function() { 
        let dt = this.$store.getters['schema/getDataTypes']; 
        if (!this.showType && dt && dt[0]) { this.showType = dt[0]['id']; this.updateDataGrid(); }
        return dt;
    },
    data: function() { return this.$store.getters['data/getData']; },
    colheaders: function() { return this.$store.getters['data/getDataHeaders']; },
    colspec: function() { return this.$store.getters['data/getDataColumnSpec']; }
  },
  methods: {
    updateDataGrid: function() {
        if (this.showType >0) {
            this.showDataGrid = false;

            var self = this;
            this.$store.dispatch('data/getDataForType', {"repo_id": this.activeRepo.id, "type": this.showType}).then(function() {
                self.showDataGrid = true;
            });
        }
    },
    handleEdit: function (changes, source) {
      if (changes) {
        var uuid = this.data[changes[0][0]]['uuid'];

        if (uuid) {
          this.isSaving = true;
          var self = this;
          this.$store.dispatch('data/saveDataNode', this.data[changes[0][0]]).then(function(resp) {
            self.isSaving = false;
          });
        }
      }
    }
  },
  components: {
      HotTable
  }
}
</script>