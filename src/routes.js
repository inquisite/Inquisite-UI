// Vue Routes Config
import Vue from 'vue'


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

const UserActivityLog = require('./UserActivityLog.vue')
Vue.component('user-activity', UserActivityLog)

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/upload', name: 'upload-data', component: UploadData },
  { path: '/user/preferences', name: 'user-prefs', component: UserPrefs },
  { path: '/user/profile', name: 'user-profile', component: UserProfile },
  { path: '/user/activity', name: 'user-activity', component: UserActivityLog }
]
