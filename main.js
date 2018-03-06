import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import ClickConfirm from 'click-confirm'
import Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import VueCharts from 'vue-chartjs'
import VueSocketio from 'vue-socket.io'
import config from './config.js'

Vue.use(VueRouter, Vuex, axios);
Vue.use(VueSocketio, config.api_endpoint, store);

const routes = require('./routes.js')
const App = require('./components/App.vue')
const store = require('./store/store.js')

// load token and set logged in status before creating router
// as routes depend upon login status
store.default.getters.getToken; 
const router = new VueRouter({
  routes: routes.default
});

Vue.component('clickConfirm', ClickConfirm);
Vue.component('autocomplete',require('./components/ui/Autocomplete.vue'));
Vue.component('flashmessage',require('./components/ui/FlashMessage.vue'));
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-polygon', Vue2Leaflet.Polygon);
Vue.component('v-rectangle', Vue2Leaflet.Rectangle);
Vue.component('v-popup', Vue2Leaflet.Popup);
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  http: {
    root: '.'
  },
  store
})

export default store
