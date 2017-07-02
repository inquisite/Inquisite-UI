import api from '../api.js'
import store from '../store.js'
import { apiHeaders } from '../../lib/utils.js'

// initial state
const state = {
  active_data: []               // for data component
}

// getters
const getters = {

}

// actions
const actions = {
    /**
     *
     */
    uploadRepoData: function(context, data) {
        if (!context.state.token) return false;
        var fd = new FormData();
        fd.append('repo_file', data.form.repo_file);  
        fd.append('repo_id', data.form.repo_id);

        return api.put('/repositories/upload', fd, {headers: apiHeaders({"auth": true, "upload": true})})
            .then(function(response) {
                context.commit('UPLOAD_REPO_DATA', response)
            })
            .catch(function(error) { context.commit('API_FAILURE', error) });
    },

    /**
     *
     */
    getDataNodes: function(context, data) {
        if(!context.state.token) return false;

        return api.post('repositories/data', data.data, {headers: apiHeaders({"auth": true, "form": true})})
            .then(function(response) { context.commit('REPO_DATA', response) })
            .catch(function(error) { context.commit('API_FAILURE', error) })
    }
}

// mutations
const mutations = {
    UPLOAD_REPO_DATA: function(state, response) { 
      state.msg = response.msg; 
      state.teaser = response.data;
      state.upload_row_count = response.row_count;  
      state.upload_fields = response.fieldnames;
      state.upload_subfields = response.nestednames;
    },
    REPO_DATA: function(state, response) { state.msg = response.msg; state.active_data = response.data }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}