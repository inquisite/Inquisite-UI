<template>
  <div class="row">
    <div class="col-sm-12 col-md-10 offset-md-1">
        <div class="row">
            <div class="col-12">
                <h2>Edit Repository {{repo.name}}</h2>

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <hr/>
                <flashmessage/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-6">
              <div class="card card-form">
                <div class="card-header text-center">
        			Repository Details
        		 </div>
                <div class="card-body">

                  <form id="editRepo-form" name="editRepo-form" method="POST" action="#">

                    <div class="form-group row">
        				<label for="name" class="col-3 col-form-label">Name</label>
        				<div class="col-9">
        					<input type="text" class="form-control" id="name" name="name" placeholder="Name" v-model="repo.name">
        				</div>
        			</div>

        			<div class="form-group row">
        				<label for="name" class="col-3 col-form-label">Description</label>
        				<div class="col-9">
        					<textarea class="form-control" v-model="repo.readme" rows="10" cols="80"></textarea>
        				</div>
        			</div>

        			<div class="form-group row">
        				<label for="name" class="col-3 col-form-label">URL</label>
        				<div class="col-9">
        					<input type="text" class="form-control" id="url" name="url" placeholder="URL" v-model="repo.url">
        				</div>
        			</div>

              <div class="form-group row">
        				<label for="name" class="col-3 col-form-label">License</label>
        				<div class="col-9">
        					<select name="license" id="license" v-model="repo.license" class="custom-select"><option v-for="o, k in licenses" :value="o.value">{{o.name}}</option></select>
        				</div>
        			</div>

              <div class="form-group row">
        				<label for="name" class="col-3 col-form-label">Access</label>
        				<div class="col-9">
        					<select name="published" id="published" v-model="repo.published" class="custom-select"><option v-for="o, k in publicationStatuses" :value="o.value">{{o.name}}</option></select>
        				</div>
        			</div>

        			<div class="form-group row">
        				<div class="col-sm-12 text-center">
        					<button v-on:submit.prevent="editRepo" v-on:click.prevent="editRepo" class="btn btn-primary">Save</button>
        				</div>
        				<div class="col-sm-12 text-right deleteRepo">
        					<click-confirm placement="top" style="display: inline;">
        						<a @click="deleteRepo(activeRepo.id)">
        							<button type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete Repository</button>
        							</a>
        					</click-confirm>
        				</div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          <div class="col-md-12 col-lg-6">
            <div class="card card-form">
              <div class="card-header text-center">
                  Data Frequency
               </div>
              <div class="card-body">
                  <div :is="current_chart" :data="result_chart_data" :options="{responsive: true, maintainAspectRatio: false, scales: {yAxes: [{display: true, ticks: {beginAtZero: true}}]}}" :height="400"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
import ImportResults from './charts/ImportResults.vue';

export default {
  name: 'home',
  data: function() {
    var repo_id = this.$attrs.id;
    var repo = jQuery.extend({}, this.$store.getters['repos/getRepoByID'](repo_id));
    repo['state'] = this.$store.state;
    return {
        repo: repo,
        current_chart: null,
        result_chart_data: {},
        repoData: []
    };
  },
  components: {
	  'result-chart': ImportResults
  },
  mounted: function() {
      var self = this;
      this.$store.dispatch('data/getDataCounts', {data: {repo_id: this.activeRepo.id}}).then(function(data){
          var labels = [];
          var dataCounts = [];
          for(var schema in data.data){
              labels.push(schema);
              dataCounts.push(data.data[schema]);
          }
          self.result_chart_data = {"labels": labels, "datasets": [{"label": "Total Records", "backgroundColor": "#1CB2C6", "data": dataCounts}]}
          self.current_chart = 'result-chart';
      });
  },
  computed: {
    repositoryCount: function() {
      return this.$store.getters['people/getUserRepoCount'];
    },
    isLoggedIn: function() {
	    return this.$store.getters.isLoggedIn;
    },
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    user: function() { return this.$store.getters['people/getUserInfo']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
    publicationStatuses: function() { return this.$store.getters['application/getPublicationStatuses']},
    licenses: function() { return this.$store.getters['application/getLicenses']}
  },
  methods: {
    editRepo: function() {
      if(this.name !== '') {
        var self = this;
        var store = this.$store;
        this.$store.dispatch('repos/editRepo', { data: {name: this.name, readme: this.readme, url: this.url, license: this.license, published: this.published}, id: this.id, makeActive: true});
      } else {
        this.$store.stage.msg = 'Repository name is a required field';
      }
    },
    deleteRepo: function(repo_id) {
        this.$store.dispatch('repos/deleteRepo', { data: { repo_id: repo_id }, router: this.$router});
    }
  }

}
</script>
