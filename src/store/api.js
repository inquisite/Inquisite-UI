import config from '../config.js'
import axios from 'axios'

var qs = require('qs')

var instance = axios.create({
  baseURL: config.api_endpoint,
});


export default {

  get(url, request) {

    return instance.get(url, {headers: {'Authorization': 'Bearer ' + request.token }})
      .then(function(response) { console.log('API GET SUCCESS'); Promise.resolve(response.data); return response.data; })
      .catch(function(error) { console.log('API GET FAILURE'); Promise.reject(error); return error; });
  },
  post(url, request) {
  
    var head = {'Content-Type': 'application/x-www-form-urlencoded'};
    if(request.token !== undefined) {
      head = {'Authorization': 'Bearer ' + request.token, 'Content-Type': 'application/x-www-form-urlencoded'}  
    }

    console.log('request');
    console.log(request)

    var qs_request = qs.stringify(request);

    console.log('qs request');
    console.log(qs_request);

    console.log('headers: ');
    console.log(head);

    return instance.post(url, qs_request, {headers: head})
      .then(function(response) { console.log('API POST SUCCESS'); Promise.resolve(response); return response.data;})
      .catch(function(error) { console.log('API POST FAILURE'); Promise.reject(error); return error;});
  },
}
