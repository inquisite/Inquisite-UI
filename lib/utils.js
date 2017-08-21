import store from '../store/store.js'

var debug = false;

/**
 * 
 */
export const debugMode = function(d) {
	debug = (d) ? true : false;
}

/**
 * 
 */
export const log = function(m) {
	if (!debug) { return; }
	console.log(m);
}

/**
 * 
 */
export const trace = function(m) {
	if (!debug) { return; }
	console.trace(m);
}

/**
 * Options:
 *      auth = Include JSON web token
 *      refresh = Incude JSON refresh token
 *      form = include application/x-www-form-urlencoded content type
 *      upload = include 
 */
export const apiHeaders = function(opts) {
    var h = {};
    if (opts['auth']) { h['Authorization'] = 'Bearer ' + store.state.token; }
    if (opts['refresh']) { h['Authorization'] = 'Bearer ' +  opts['refresh']; }
    if (opts['form']) { h['Content-Type'] = 'application/x-www-form-urlencoded'; }
    if (opts['upload']) { h['Content-Type'] = 'multipart/form-data'; }
    return h;
}

/**
 * 
 */
export const validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 *
 */
export const extractAPIError = function(error) {
    return {"isError": true, "error": error, "message": error.response.data.msg};
}