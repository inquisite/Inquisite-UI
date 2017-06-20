import config from '../config.js'
import store from '../store.js'
import axios from 'axios'

var qs = require('qs')

var instance = axios.create({
  baseURL: config.api_endpoint,
});


export default {

  get(url, req_config) {
    return instance.get(url, req_config)
      .then(function(response) { 
      	console.log('API GET SUCCESS', response); 
      	Promise.resolve(response.data); 
      	
      	if(response.data.status == 401) {
        	console.log("[GET] Token expired", store.getters.getToken);
          	store.dispatch('doRefresh', {'refresh': store.getters.getRWT, 'callback': {
          		'instance': instance,
          		'method': 'get',
          		'url': url,
          		'config': req_config
          	}});
          	return false;
        }
      	return response.data; 
      }).catch(function(error) { 
        Promise.reject(error);
        return error;
      });
  },

  post(url, data, req_config) {
    var d = data;
    return instance.post(url, qs.stringify(data), req_config)
      .then(function(response) { 
      	console.log('API POST SUCCESS', response); 
      	Promise.resolve(response); 
      	
      	if(response.data.status == 401) {
        	console.log("[POST] Token expired", store.getters.getToken);
          	store.dispatch('doRefresh', {'refresh': store.getters.getRWT, 'callback': {
          		'instance': instance,
          		'method': 'post',
          		'url': url,
          		'data': d,
          		'config': req_config
          	}});
          	return false;
        }
      	return response.data;
      }).catch(function(error) { 
        Promise.reject(error);
        return error;
      });
  },

  put(url, data, req_config) {
    return instance.put(url, data, req_config)
      .then(function(response) { 
      	console.log('API PUT SUCESS'); 
      	Promise.resolve(response); 
      	
      	if(response.data.status == 401) {
        	console.log("[PUT] Token expired", store.getters.getToken);
          	store.dispatch('doRefresh', {'refresh': store.getters.getRWT, 'callback': {
          		'instance': instance,
          		'method': 'put',
          		'url': url,
          		'config': req_config
          	}});
          	return true;
        }
      	return response.data;
      }).catch(function(error) { 
        Promise.reject(error);
        return error;
      });
  }
}