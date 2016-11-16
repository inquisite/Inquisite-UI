import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// Load template components
//import Home from './Home.vue'
const Home = require('./Home.vue');
Vue.component('home', Home)

//import Signup from './Signup.vue'
const Signup = require('./Signup.vue');
Vue.component('signup', Signup)

//import Login from './Login.vue'
const Login = require('./Login.vue');
Vue.component('login', Login)

//import UploadData from './UploadData.vue'
const UploadData = require('./UploadData.vue');
Vue.component('upload-data', UploadData)

const App = require('./App.vue')
const store = require('./store.js');



const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login },
    { path: '/upload', name: 'upload-data', component: UploadData }
  ]
});

new Vue({
  store,
  el: '#app',
  render: h => h(App),
  router: router,
})
