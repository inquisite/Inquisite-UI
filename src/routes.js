// Vue Routes Config
import Vue from 'vue'
import store from './store.js'


// Load Template Components
const Home = require('./Home.vue')
Vue.component('home', Home)

const Signup = require('./Signup.vue')
Vue.component('signup', Signup)

const Login = require('./Login.vue')
Vue.component('login', Login)

const UploadData = require('./UploadData.vue')
Vue.component('upload-data', UploadData)

const UserPrefs = require('./UserPrefs.vue')
Vue.component('user-prefs', UserPrefs)

const UserProfile = require('./UserProfile.vue')
Vue.component('user-profile', UserProfile)

const MyProfile = require('./MyProfile.vue')
Vue.component('my-profile', MyProfile)

const UserActivityLog = require('./UserActivityLog.vue')
Vue.component('user-activity', UserActivityLog)

const AddRepo = require('./AddRepo.vue')
Vue.component('add-repo', AddRepo)

const EditRepo = require('./EditRepo.vue')
Vue.component('edit-repo', EditRepo)

const AddPersonRepo = require('./AddPersonRepo.vue')
Vue.component('add-person-repo', AddPersonRepo)

const VisualizeNodes = require('./VisualizeNodes.vue')
Vue.component('visualize-nodes', VisualizeNodes)

const VisualizeSheets = require('./VisualizeSheets.vue')
Vue.component('visualise-sheets', VisualizeSheets)

var sharedState = store.state;

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/upload', name: 'upload-data', component: UploadData, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/preferences', name: 'user-prefs', component: UserPrefs, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/profile', name: 'user-profile', component: UserProfile, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/my-profile', name: 'my-profile', component: MyProfile, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/activity', name: 'user-activity', component: UserActivityLog, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/add-repo', name: 'add-repo', component: AddRepo, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/edit-repo/:id', props: true, name: 'edit-repo', component: EditRepo, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/add-person-repo', name: 'add-person-repo', component: AddPersonRepo, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/visualize/nodes', name: 'visualize-nodes', component: VisualizeNodes, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/visualize/sheet', name: 'visualize-sheets', component: VisualizeSheets, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '*', redirect: '/' }
]
