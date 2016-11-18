import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// Load template components
const Home = require('./Home.vue');
Vue.component('home', Home)

const Signup = require('./Signup.vue');
Vue.component('signup', Signup)

const Login = require('./Login.vue');
Vue.component('login', Login)

const UploadData = require('./UploadData.vue');
Vue.component('upload-data', UploadData)

const UserPrefs = require('./UserPrefs.vue');
Vue.component('user-prefs', UserPrefs)

const UserProfile = require('./UserProfile.vue');
Vue.component('user-profile', UserProfile)

const UserActivityLog = require('./UserActivityLog.vue');
Vue.component('user-activity', UserActivityLog)

const App = require('./App.vue')
const store = require('./store.js');

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login },
    { path: '/upload', name: 'upload-data', component: UploadData },
    { path: '/user/:id/preferences', name: 'user-prefs', component: UserPrefs },
    { path: '/user/:id/profile', name: 'user-profile', component: UserProfile },
    { path: '/user/:id/activity', name: 'user-activity', component: UserActivityLog }
  ]
});

new Vue({
  store,
  el: '#app',
  render: h => h(App),
  router: router,
  ready: function() {
    console.log('main app ready function');
  }
})
