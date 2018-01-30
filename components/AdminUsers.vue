<template>
<div id="import-history">
  <div class="row">
    <div class="col-sm-12">
      <div class="card card-gray">
        <div class="card-header">
			    Users ({{people.length}})
		    </div>
        <div class="card-block" style="display:flex; overflow-x: auto;">
          <div class="row"><div class="col-sm-12">
            <ul class="list-group">
              <li class="list-group-item justify-content-between" v-for="p in people">
               <a data-toggle="modal" data-target="#PersonInfoModal">{{p.name}}</a>
               <small>{{p.email}}</small>
                <span class="badge badge-default badge-pill">14 repositories</span>
              </li>
            </ul>
            </div></div>
        </div>  
      </div>
    </div>
  </div>
  <div class="modal fade" id="PersonInfoModal" tabindex="-1" role="dialog" aria-labelledby="Person Information" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Person information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="PersonInfoContent">
          Content goes here
        </div>
        <div class="modal-footer">
          
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default { 
  name: 'admin-users',
  data: function() {
      return {
        people: []
      };
  },
  mounted: function() {
    this.getPeopleList();
  },
  computed: {
    repos: function() { return this.$store.getters['people/getUserRepos']; },
    activeRepo: function() { return this.$store.getters['repos/getActiveRepo']; },
  }, 
  methods: {
    getPeopleList: function() {
      var self = this;
      this.$store.dispatch("people/list", {}).then(function(response) {
       // noop
       console.log(response);
       self.people = self.$store.getters['people/getList']
      });
    }
  } 
}
</script>