<template>
<div id="user-profile">
  <div class="ui grid">
    <div class="sixteen wide column">
      <h1>User Profile</h1>
    </div>
  </div>

  <div class="ui section divider"></div>

  <div class="ui grid">
    <div class="eight wide column">
      <div class="ui raised segment">
        <div class="ui large list">
       
         <div> User Details to come for {{sharedState.username}} </div> 

        </div>  
      </div>
    </div>
  </div>
</div>

</template>

<script>
import store from './store.js'

export default { 
  name: 'user-profile',
  data: function() {
    return {
      sharedState: store.state
    }
  },
  methods: {},
  
}
</script>

<style>
.form-item { padding: 5px 0; }
</style>
