<template>
<div id="visualize-data-sheets">
    <div class="row">
        <div class="col-12">
            <div class="card card-gray">
                <div class="card-header">
                    Map from <em>{{activeRepo.name}}</em>
                </div>
                <div class="card-block">
                    <div class="row">
                        <div class="col-sm-2 schema-map-list">
                            <div class="schema-map-item" v-for="k, v in dataTypes">
                                <div class="text-center">
                                    <button class="btn btn-block" v-on:click="updateMap(k.id)" v-bind:class="[buttonStatus[k.id] ? 'btn-primary' : 'btn-secondary']"><h5>{{k.name}}</h5></button>
                                </div>
                                <div class="schema-map-fields" v-show="k.id == showType">
                                    <h6 class="text-center">Georeference Field:<br/>{{showField}}</h6>
                                    <ul class="list-group map-list-group" >
                                        <li class="small" v-for="kf, vf in k.fields">
                                            <input type="checkbox" v-model="displayFields" :value="kf.code" v-on:click="updateMap(k.id)"/> {{kf.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-10">
                            <div id="map" style="width: 100%; height: 500px;">
                                <v-map ref="map" :zoom="13">
                                    <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"></v-tilelayer>
                                    <v-marker-cluster>
                                        <v-marker v-if="points.length > 0" :key="i" v-for="p, i in points" :lat-lng="p"><v-popup :content="pointLabels[i]"></v-popup></v-marker>
                                        <v-polygon v-if="polygons.length > 0" :key="i" v-for="p, i in polygons" :lat-lngs="p"><v-popup :content="polygonLabels[i]"></v-popup></v-polygon>
                                        <v-polyline v-if="lines.length > 0" :key="i" v-for="p, i in lines" :lat-lngs="p"><v-popup :content="lineLabels[i]"></v-popup></v-polyline>
                                    </v-marker-cluster>
                                    <v-geo-json :geojson="geojson"></v-geo-json>
                                </v-map>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
<script>
export default {
  name: 'visualize-data-maps',
  data: function() {
    return {
      showType: null,
      showField: null,
      displayFields: [],
      dataTypeShow: [],
      coords: {"polygons": [], "polygon_labels": [], "points": [], "point_labels": [], "lines": [], "line_labels": []},
      geojson: [],
      workingGeo: [],
    }
  },
  mounted: function() {
    var self = this;
    this.$store.dispatch('schema/getDataTypes', this.$store.getters['repos/getActiveRepoID']).then(function() {
        self.showType = self.$store.getters['schema/getDefaultDataType'];
        self.loadMap();

        var t = self.dataTypes.filter((v) => v.id == self.showType);
        if (t[0]) {
          // Select first georef field for display
          var georefFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] == 'GeorefDataType'; });
          self.showField = georefFields.length > 0 ? georefFields[0]['code'] + '_geoJSON' : null;

          // Select first field for display
          var nonGeorefFields = t[0]["fields"].filter(function(v, i, a) { return v['type']});
          self.displayFields = nonGeorefFields.length > 0 ? [nonGeorefFields[0]['code']] : [];
          //self.displayFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] });
        }

    });
  },
  computed: {
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
    mapData: function() { return this.$store.getters['data/getData']; },
    points: function() {
      var c = this.coords;
      return c["points"];
    },
    pointLabels: function() {
      var self = this;
      var c = this.coords;
      var display_fields = this.displayFields;
      return c["point_labels"].map((v, i) => {
        var field_values = [];
        for(var f in display_fields) {
          //if (display_fields[f] == self.showField) { continue; }
          var t = self.dataTypes.filter((v) => v.id == this.showType);
          var l = t[0]["fields"].filter((v) => v.code === display_fields[f]);
          var field_label = (l && l[0]) ? l[0].name : "???";
          field_values.push(field_label + ": " + v[display_fields[f]]);
        }
        return field_values.join("<br/>\n");
      });
    },
    polygons: function() {
      var c = this.coords;
      return c["polygons"];
    },
    polygonLabels: function() {
      var self = this;
      var c = this.coords;
      var display_fields = this.displayFields;
      return c["polygon_labels"].map((v, i) => {
        var field_values = [];
        for(var f in display_fields) {
          //if (display_fields[f] == self.showField) { continue; }
          var t = self.dataTypes.filter((v) => v.id == self.showType);
          var l = t[0]["fields"].filter((v) => v.code === display_fields[f]);
          var field_label = (l && l[0]) ? l[0].name : "???";
          field_values.push(field_label + ": " + v[display_fields[f]]);
        }
        return field_values.join("<br/>\n");
      });
    },
    lines: function() {
      var c = this.coords;
      return c["lines"];
    },
    lineLabels: function() {
      var self = this;
      var c = this.coords;
      var display_fields = this.displayFields;
      return c["line_labels"].map((v, i) => {
        var field_values = [];
        for(var f in display_fields) {
          //if (display_fields[f] == self.showField) { continue; }
          var t = self.dataTypes.filter((v) => v.id == self.showType);
          var l = t[0]["fields"].filter((v) => v.code === display_fields[f]);
          var field_label = (l && l[0]) ? l[0].name : "???";
          field_values.push(field_label + ": " + v[display_fields[f]]);
        }
        return field_values.join("<br/>\n");
      });
    },
    buttonStatus: function() {
        var buttonStatus = {}
        for(var i in this.dataTypes){
            if(this.dataTypes[i].id == this.showType){
                buttonStatus[this.dataTypes[i].id] = true;
            } else {
                buttonStatus[this.dataTypes[i].id] = false;
            }
        }
        return buttonStatus;
    }
  },
  methods: {
    loadMap: function() {
        if (this.showType > 0) {

            var self = this;
            this.$store.dispatch('data/getDataForType', {"repo_id": this.$store.getters['repos/getActiveRepoID'], "type": this.showType}).then(function(r) {
                self.getCoords();
                self.setMapCenterZoom();
            });

        }
    },
    updateMap: function(newType) {
        if (newType != this.showType) {
          this.showType = newType;
          var t = this.dataTypes.filter((v) => v.id == this.showType);
          // Select first georef field for display
          var georefFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] == 'GeorefDataType'; });
          this.showField = georefFields.length > 0 ? georefFields[0]['code']+'_geoJSON' : null;

          // Select first field for display
          var nonGeorefFields = t[0]["fields"].filter(function(v, i, a) { return v['type']});
          this.displayFields = nonGeorefFields.length > 0 ? [nonGeorefFields[0]['code']] : [];
          //self.displayFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] });
      } else {
          this.showType = newType;
      }
        this.loadMap();
    },
    getCoords: function() {
      this.coords = {"polygons": [], "polygon_labels": [], "points": [], "point_labels": [], "lines": [], "line_labels": []}
      var d = this.mapData;
      var count = 0;
      for(var i in d) {
        if (d[i] && d[i][this.showField]) {
            // TODO: improve performance and remove limit
            if (count > 3000) break;
            var c = JSON.parse(d[i][this.showField]);
            this.geojson.push(c);
            if (c['coordinates']) {
              count++;

              var type_array = "";
              var type_label_array = "";
              switch(c['type']) {
                case "polygon":
                case "multipolygon":
                  type_array = 'polygons';
                  type_label_array = 'polygon_labels';
                  break;
                case "point":
                  type_array = 'points';
                  type_label_array = 'point_labels';
                  break;
                case "linestring":
                case "multilinestring":
                  type_array = 'lines';
                  type_label_array = 'line_labels';
                  break;
                default:
                  break;
              }
              var p = this.convertNestedGeoref(c['coordinates']);
              this.coords[type_array].push(p);

              this.coords[type_label_array].push(Object.keys(d[i]).filter(key => key !== 'coordinates')
                .reduce((obj, key) => { obj[key] = d[i][key]; return obj; }, {}));
            }
        }
      }
      return this.coords;
    },
    setMapCenterZoom: function() {
      var minLat = 90;
      var minLon = 180;
      var maxLat = -90;
      var maxLon = -180;
      var maxMins = [];
      if(this.coords["polygons"].length < 1 && this.coords["points"].length < 1 && this.coords["lines"].length < 1){
          return [0,0];
      }
      var polygons = this.coords["polygons"];
      var points = this.coords["points"];
      var lines = this.coords["lines"];
      if(polygons){
          maxMins = this.getMaxMinCoords(polygons, [maxLon, maxLat, minLon, minLat]);
      }
      if(points){
          maxMins = this.getMaxMinCoords(points, maxMins);
      }
      if(lines){
          maxMins = this.getMaxMinCoords(lines, maxMins);
      }
      maxLon = maxMins[0];
      maxLat = maxMins[1];
      minLon = maxMins[2];
      minLat = maxMins[3];
      this.$refs.map.mapObject.fitBounds([[minLat, minLon], [maxLat, maxLon]], {"padding": [30, 30]})
      //return [avgLon, avgLat];
    },

    convertNestedGeoref: function(georef) {
        var geoLen = georef.length;
        for(var i = 0; i < geoLen; i++){
            var test = georef[i];
            var type = typeof test;
            if(type == 'array' || type == 'object'){
                var converted = this.convertNestedGeoref(test);
                georef[i] = converted;
            } else {
                var leafLatLng = [georef[1], georef[0]];
                georef = leafLatLng;
                break;
            }
        }
        return georef;
    },

    getMaxMinCoords: function(georefs, maxMins){
        var geoLen = georefs.length;
        for(var i = 0; i < geoLen; i++){
            var test = georefs[i];
            var type = typeof test;
            if(type == 'array' || type == 'object'){
                maxMins = this.getMaxMinCoords(test, maxMins);
            } else {
                if(maxMins[0] < georefs[1]){ maxMins[0] = georefs[1]}
                if(maxMins[1] < georefs[0]){ maxMins[1] = georefs[0]}
                if(maxMins[2] > georefs[1]){ maxMins[2] = georefs[1]}
                if(maxMins[3] > georefs[0]){ maxMins[3] = georefs[0]}
                return maxMins;
            }
        }
        return maxMins;
    }

  }
}
</script>
