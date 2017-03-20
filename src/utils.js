var debug = false;

export const debugMode = function(d) {
	debug = (d) ? true : false;
}

export const log = function(m) {
	if (!debug) { return; }
	console.log(m);
}

export const trace = function(m) {
	if (!debug) { return; }
	console.trace(m);
}