<template>
<div id="data-editor">
    <a v-if="lastSearch" :href="'#/search?q=' + lastSearch">Back to search results</a>
    <div class="row">
        <div class="col-sm-12">
          <div id="data-editor-msg" class="alert alert-danger" role="alert" v-show="message !== ''">{{message}}</div>
            <div class="card card-form">
                <div class="card-header text-center">
                    Data Editor: {{nodeTypeName}} #{{id}}
                </div>
                <div class="card-block">
                    <div v-for="v,k in node" class="row">
                        <div class="col-sm-4">{{k}}</div><div class="col-sm-8"><input type="text" v-model="node[k]" size="60"/></div>
                    </div>
                    <div class="item" style="padding: 10px 0">
                        <button v-on:submit.prevent="saveData" v-on:click.prevent="saveData" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default { 
  name: 'data-editor',
  data: function() {
    return {
      node: null,
      nodeTypeName: null,
      nodeTypeCode: null,
      state: this.$store.state
    };
  },
  props: [
    'id'
  ],
  mounted: function() {
    var self = this;
        this.$store.dispatch('data/getDataNode', this.id).then(function(response) {
	        //console.log("GOT ", response);
	        self.node = response['data'];
	        self.nodeTypeName = response['typename'];
	        self.nodeTypeCode = response['typecode'];
	    });
  },
  computed: {
    lastSearch: function() {
        return this.$store.getters['search/getLastSearch'];
    },
	message: function() { return this.$store.state.msg; }
  },
  methods: {
    saveData: function() {
        this.$store.dispatch('data/saveDataNode', jQuery.extend(this.node, {'node_id': this.id})).then(function(response) {
            console.log("save!", response);
        });
    }
  } 
}
</script>