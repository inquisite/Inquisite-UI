// Vue Routes Config
import Vue from 'vue'
import store from './store/store.js'


// Load Template Components
const Home = require('./components/Home.vue')
Vue.component('home', Home)

const Signup = require('./components/Signup.vue')
Vue.component('signup', Signup)

const Login = require('./components/Login.vue')
Vue.component('login', Login)

const UploadData = require('./components/UploadData.vue')
Vue.component('upload-data', UploadData)

const UserPrefs = require('./components/UserPrefs.vue')
Vue.component('user-prefs', UserPrefs)

const UserProfile = require('./components/UserProfile.vue')
Vue.component('user-profile', UserProfile)

const MyProfile = require('./components/MyProfile.vue')
Vue.component('my-profile', MyProfile)

const UserActivityLog = require('./components/UserActivityLog.vue')
Vue.component('user-activity', UserActivityLog)

const AddRepo = require('./components/AddRepo.vue')
Vue.component('add-repo', AddRepo)

const EditRepo = require('./components/EditRepo.vue')
Vue.component('edit-repo', EditRepo)

const ManageRepoCollaborators = require('./components/ManageRepoCollaborators.vue')
Vue.component('manage-collaborators', ManageRepoCollaborators)

const VisualizeNodes = require('./components/VisualizeNodes.vue')
Vue.component('visualize-nodes', VisualizeNodes)

const VisualizeSheets = require('./components/VisualizeSheets.vue')
Vue.component('visualise-sheets', VisualizeSheets)

const VisualizeMaps = require('./components/VisualizeMaps.vue')
Vue.component('visualise-maps', VisualizeMaps)

const SchemaEditor = require('./components/SchemaEditor.vue')
Vue.component('schema-editor', SchemaEditor)

const ListEditor = require('./components/ListEditor.vue')
Vue.component('list-editor', ListEditor)

const Search = require('./components/Search.vue')
Vue.component('search', Search)

const DataEditor = require('./components/DataEditor.vue')
Vue.component('data-editor', DataEditor)

const ImportHistory = require('./components/ImportHistory.vue')
Vue.component('import-history', ImportHistory)

const AdminUsers = require('./components/AdminUsers.vue')
Vue.component('admin-users', AdminUsers)

const GettingStarted = require('./components/GettingStarted.vue')
Vue.component('getting-started', GettingStarted)

const ContactUs = require('./components/ContactUs.vue')
Vue.component('contact-us', ContactUs)

const FAQ = require('./components/FAQ.vue')
Vue.component('faq', FAQ)

const Password = require('./components/Password.vue')
Vue.component('password', Password)

const PasswordReset = require('./components/PasswordReset.vue')
Vue.component('PasswordReset', PasswordReset)

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/help/getting-started', name: 'getting-started', component: GettingStarted },
  { path: '/help/faq', name: 'faq', component: FAQ },
  { path: '/help/contact', name: 'contact-us', component: ContactUs },
  { path: '/upload', name: 'upload-data', component: UploadData, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/preferences', name: 'user-prefs', component: UserPrefs, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/profile', name: 'user-profile', component: UserProfile, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/my-profile', name: 'my-profile', component: MyProfile, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/user/activity', name: 'user-activity', component: UserActivityLog, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/add-repo', name: 'add-repo', component: AddRepo, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/edit-repo/:id', props: true, name: 'edit-repo', component: EditRepo, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/manage-collaborators', name: 'manage-collaborators', component: ManageRepoCollaborators, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/visualize/nodes', name: 'visualize-nodes', component: VisualizeNodes, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/visualize/sheets', name: 'visualize-sheets', component: VisualizeSheets, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/visualize/maps', name: 'visualize-maps', component: VisualizeMaps, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/schema', name: 'schema-editor', component: SchemaEditor, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/list', name: 'list-editor', component: ListEditor, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/data/edit/:id', name: 'data-editor', component: DataEditor, props: true, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/import-history', name: 'import-history', component: ImportHistory, props: true, 'beforeEnter': function(f, t, n) { n(store.getters.isLoggedIn);} },
  { path: '/search', name: 'search', component: Search },
  { path: '/admin/users', name: 'admin-users', component: AdminUsers, 'beforeEnter': function(f, t, n) { n(store.getters['people/userIsAdmin']);} },
  { path: '/password', name: 'password', component: Password },
  { path: '/password/reset', name: 'password-reset', component: PasswordReset },
  { path: '*', redirect: '/' }
]
