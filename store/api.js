import config from '../config.js'
import store from './store.js'
import axios from 'axios'
import { apiHeaders, extractAPIError } from '../lib/utils.js'

var qs = require('qs')

var instance = axios.create({
  baseURL: config.api_endpoint,
});

instance.interceptors.request.use((config) => {
	let originalReq = config;

	let token_exp_time = store.getters.getTokenExpiration;
	//console.log("[INTERCEPT] Exp time is " + token_exp_time);
	//console.log("[INTERCEPT] " + config['url']);
	if ((config['url'].indexOf('/login') < 0) && (config['url'].indexOf('/register') < 0) && (config['url'].indexOf('/reset_password') < 0) && (config['url'].indexOf('/set_password') < 0) && !config['isRefresh'] && (!token_exp_time || (token_exp_time < new Date().getTime()))) {
		  console.log("[INTERCEPT] Token expired");
		//console.log("[INTERCEPT] Refresh with ", store.getters.getRWT);
      return instance.post('/refresh', null, {isRefresh: 1, headers: apiHeaders({"refresh": store.getters.getRWT})}).then(function(refresh_response) {
			console.log("[INTERCEPT] Got new access token");
			originalReq['Authorization'] = 'Bearer ' + refresh_response.data.access_token;
			store.dispatch('setAccessToken', refresh_response.data.access_token);
			Promise.resolve(refresh_response);
			return Promise.resolve(originalReq);
		}).catch(function(error) {
			alert("error" + error);
		});
	}
	return config;
}, (err) => {
  return Promise.reject(err);
});

export default {
  get(url, req_config) {
		req_config['validateStatus'] =  function (status) {
			return status >= 200 && status < 420; 
		};
    return instance.get(url, req_config)
      .then(function(response) {
      	console.log('API GET SUCCESS', response);
				Promise.resolve(response.data);
				
				var d = response.data;
				d['_status'] = response.status;
      	return d;
      }).catch(function(error) {
				if(error == 'Error: Network Error') {
					alert("Could not connect to network services");
				}

				return error;
      });
  },

  post(url, data, req_config) {
		req_config['validateStatus'] =  function (status) {
			return status >= 200 && status < 420; 
		};
		var d = data;
    return instance.post(url, qs.stringify(data), req_config)
      .then(function(response) {
      	console.log('API POST SUCCESS', response);
      	Promise.resolve(response);

				var d = response.data;
				d['_status'] = response.status;
      	return d;
      }).catch(function(error) {
				if(error == 'Error: Network Error') {
					alert("Could not connect to network services");
				}

        return error;
      });
  },

  put(url, data, req_config) {
		req_config['validateStatus'] =  function (status) {
			return status >= 200 && status < 420; 
		};
    return instance.put(url, data, req_config)
      .then(function(response) {
      	console.log('API PUT SUCCESS', response);
				Promise.resolve(response);
				
				var d = response.data;
				d['_status'] = response.status;
      	return d;
      }).catch(function(error) {
				if(error == 'Error: Network Error') {
					alert("Could not connect to network services");
				}
        return error;
      });
  }
}
