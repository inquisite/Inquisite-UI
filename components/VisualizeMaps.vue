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
                                    <ul class="list-group" >
                                        <li class="small" v-for="kf, vf in k.fields" v-if="kf.type != 'GeorefDataType'">
                                            <input type="checkbox" v-model="displayFields" :value="kf.code" v-on:click="updateMap(k.id)"/> {{kf.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-10">
                            <div id="map" style="width: 100%; height: 500px;">
                                <v-map :zoom=13 :center="getMapCenter">
                                    <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"></v-tilelayer>
                                    <v-marker-cluster>
                                        <v-marker v-if="points.length > 0" v-for="p, i in points" :lat-lng="p"><v-popup :content="pointLabels[i]"></v-popup></v-marker>
                                        <v-polygon v-if="polygons.length > 0" v-for="p, i in polygons" :lat-lngs="p"><v-popup :content="polygonLabels[i]"></v-popup></v-polygon>
                                    </v-marker-cluster>
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
      coords: {"polygons": [], "polygon_labels": [], "points": [], "point_labels": []}
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
          self.showField = georefFields.length > 0 ? georefFields[0]['code'] : null;

          // Select first field for display
          var nonGeorefFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] != 'GeorefDataType'; });
          self.displayFields = nonGeorefFields.length > 0 ? [nonGeorefFields[0]['code']] : [];
        }

    });
  },
  computed: {
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    dataTypes: function() { return this.$store.getters['schema/getDataTypes']; },
    mapData: function() { return this.$store.getters['data/getData']; },
    getMapCenter: function() {
      var totalLat = 0;
      var totalLon = 0
      var measureCount = 0;
      if(this.coords["polygons"].length < 1 && this.coords["points"].length < 1){
          return [0,0];
      }
      var polygons = this.coords["polygons"];
      var points = this.coords["points"];
      for(var i in polygons){
          for(var j in polygons[i]['coordinates']){
              totalLon += polygons[i]['coordinates'][j][0];
              totalLat += polygons[i]['coordinates'][j][1];
              measureCount++;
          }
      }
      for(var k in points){
          totalLon += points[k][0];
          totalLat += points[k][1];
          measureCount++;
      }
      var avgLat = totalLat/measureCount;
      var avgLon = totalLon/measureCount;
      return [avgLon, avgLat];
    },
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
          if (display_fields[f] == self.showField) { continue; }
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
          if (display_fields[f] == self.showField) { continue; }
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
            console.log(this.dataTypes[i]);
            if(this.dataTypes[i].id == this.showType){
                buttonStatus[this.dataTypes[i].id] = true;
            } else {
                buttonStatus[this.dataTypes[i].id] = false;
            }
        }
        console.log(buttonStatus);
        return buttonStatus;
    }
  },
  methods: {
    loadMap: function() {
        if (this.showType > 0) {

            var self = this;
            this.$store.dispatch('data/getDataForType', {"repo_id": this.activeRepo.id, "type": this.showType}).then(function(r) {
                self.getCoords();
            });
        }
    },
    updateMap: function(newType) {
        if (newType != this.showType) {
          this.showType = newType;
          var t = this.dataTypes.filter((v) => v.id == this.showType);
          // Select first georef field for display
          var georefFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] == 'GeorefDataType'; });
          this.showField = georefFields.length > 0 ? georefFields[0]['code'] : null;

          // Select first field for display
          var nonGeorefFields = t[0]["fields"].filter(function(v, i, a) { return v['type'] != 'GeorefDataType'; });
          this.displayFields = nonGeorefFields.length > 0 ? [nonGeorefFields[0]['code']] : [];
      } else {
          this.showType = newType;
      }
        this.loadMap();
    },
    getCoords: function() {
      this.coords = {"polygons": [], "polygon_labels": [], "points": [], "point_labels": []}
      var d = this.mapData;
      var count = 0;
      for(var i in d) {
        if (d[i] && d[i][this.showField]) {
            // TODO: improve performance and remove limit
            if (count > 3000) break;
            var c = JSON.parse(d[i][this.showField]);
            if (c['coordinates']) {
              count++;

              switch(c['type']) {
                case "polygon":
                  for(var g in c['coordinates']) {
                    var p = [];
                    for(var cs in c['coordinates'][g]) {
                      // flip long/lat (GeoJSON) to lat/long (Leaflet)
                      p.push([c['coordinates'][g][cs][1], c['coordinates'][g][cs][0]])
                    }
                    this.coords['polygons'].push(p);
                    this.coords['polygon_labels'].push(Object.keys(d[i]).filter(key => key !== 'coordinates')
                          .reduce((obj, key) => { obj[key] = d[i][key]; return obj; }, {}));
                  }
                  break;
                case "point":
                  var p = [c['coordinates'][1], c['coordinates'][0]];

                  this.coords['points'].push(p);
                  this.coords['point_labels'].push(Object.keys(d[i]).filter(key => key !== 'coordinates')
                        .reduce((obj, key) => { obj[key] = d[i][key]; return obj; }, {}));
                  break;
              }
            }
        }
    }
      return this.coords;
    }
  }
}
</script>
