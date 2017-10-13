<template>
<div id="visualize-data-sheets">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			Map from <em>{{activeRepo.name}}</em>
		 </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
            <div id="map" style="width: 100%; height: 500px;">
              <v-map :zoom=13 :center="[47.413220, -1.219482]">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                <v-marker :lat-lng="[47.413220, -1.219482]" :l-move="doSomething"></v-marker>
              </v-map>
            </div>
        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>



export default { 
  name: 'visualize-data-maps',
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