import config from '../config.js'
import axios from 'axios'

var qs = require('qs')

var instance = axios.create({
  baseURL: config.api_endpoint,
});


export default {

  get(url, req_config) {
    return instance.get(url, req_config)
      .then(function(response) { console.log('API GET SUCCESS'); Promise.resolve(response.data); return response.data; })
      .catch(function(error) { 
        Promise.reject('do refresh');
        if(error.status === undefined) {
          console.log('Im gonna try refresh now');
          return "do refresh";
        }

        Promise.reject(error);

        return error;
      });
  },

  post(url, data, req_config) {

    data = qs.stringify(data);

    return instance.post(url, data, req_config)
      .then(function(response) { console.log('API POST SUCCESS'); Promise.resolve(response); return response.data;})
      .catch(function(error) { 
        Promise.reject(error); 
        return error;
      });
  },

  put(url, data, req_config) {
    return instance.put(url, data, req_config)
      .then(function(response) { console.log('API PUT SUCESS'); Promise.resolve(response); return response.data;})
      .catch(function(error) { console.log('API PUT ERROR'); Promise.reject(error); return error;});
  }
}
