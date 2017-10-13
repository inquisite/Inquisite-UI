<template>
<div id="visualize-data-nodes">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			Data Network from <em>{{activeRepo.name}}</em>
		 </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
           Node diagram here
        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>



export default { 
  name: 'visualize-data-nodes',
  data: function() {
    return {
      
    }
  },
  mounted: function() {
    
  },
  computed: { 
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; }
  },
  methods: {
    
  }
}
</script>