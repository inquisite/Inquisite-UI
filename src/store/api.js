import config from '../config.js'
import axios from 'axios'

var qs = require('qs')

var instance = axios.create({
  baseURL: config.api_endpoint,
});


export default {

  get(url, req_config) {

    console.log('GET CONFIG:');
    console.log( req_config );

    return instance.get(url, req_config)
      .then(function(response) { console.log('API GET SUCCESS'); Promise.resolve(response.data); return response.data; })
      .catch(function(error) { 
        console.log('API GET FAILURE'); 
        //Promise.reject(error); 

        Promise.reject('do refresh');
        if(error.status === undefined) {
          console.log('Im gonna try refresh now');
          return "do refresh";
        }

        return error;
      });
  },

  post(url, data, req_config) {

    console.log('RAW POST DATA:');
    console.log(data);
    data = qs.stringify(data);
 
    console.log('STRING DATA');
    console.log(data);

    console.log('POST Config');
    console.log(req_config);


    return instance.post(url, data, req_config)
      .then(function(response) { console.log('API POST SUCCESS'); Promise.resolve(response); return response.data;})
      .catch(function(error) { console.log('API POST FAILURE'); Promise.reject(error); return error;});
  },

  put(url, data, req_config) {

    console.log('RAW PUT DATA:');
    console.log(data);

    console.log('PUT Config');
    console.log(req_config);

    return instance.put(url, data, req_config)
      .then(function(response) { console.log('API PUT SUCESS'); Promise.resolve(response); return response.data;})
      .catch(function(error) { console.log('API PUT ERROR'); Promise.reject(error); return error;});
  }
}
