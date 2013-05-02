//main.js is used only for settings and initializing application,
//all heavy logic is stored inside proper modules, it makes it
//easy to require core modules from inside the application and
//also keeps main.js small since settings adds too much noise
//to the real code.
//
//see: http://blog.millermedeiros.com/2011/05/single-entry-point-ftw/

//SETTINGS ========

require.config({

	appDir : "../",
	baseUrl : "scripts/",
	dir : "../../webapp-build",
	// Comment out the optimize line if you want
	// the code minified by UglifyJS
	optimize : "none",

	waitSeconds : 120, // make sure it is enough to load all gmaps scripts
	paths : {
		"jquery" : "require-jquery",
		"devoxx" : "devoxx",
		"tfidf" : "tfidf",
//		"natural" : "../node_modules/natural/index",
//		"natural" : "natural",
	
        // create alias to plugins (not needed if plugins are on the
		// baseUrl)
        "async": '../lib/requirejs-plugin/async',
        "font": '../lib/requirejs-plugin/font',
        "gmaps": '../lib/requirejs-plugin/goog',
        "image": '../lib/requirejs-plugin/image',
        "json": '../lib/requirejs-plugin/json',
        "noext": '../lib/requirejs-plugin/noext',
        "mdown": '../lib/requirejs-plugin/mdown',
        "propertyParser" : '../lib/requirejs-plugin/propertyParser',
        "markdownConverter" : '../lib/Markdown.Converter'
    },
	
	// Sets the configuration for your third party scripts that are not AMD
	// compatible
//	shim : {
//		gmaps : {
//			deps: ["jquery", "async!http://maps.google.com/maps/api/js?v=3&sensor=false"],
//			exports : 'gmaps'
//		}
//	},

	// Optimize the application files. jQuery is not
	// included since it is already in require-jquery.js
	modules : [ {
		name : "main",
		exclude : [ "jquery" ]
	} ]

});

// INIT APP ========

// convert Google Maps into an AMD module
define('gmaps', ['async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false'],	
	function(){
	 	// return the gmaps namespace for brevity
	 	// return window.google.maps;
	 	console.log("gmaps loaded...");
	}
);

//require(['natural'],
//	function(){
//		//foo and bar are loaded according to requirejs
//		//config, but if not found, then node's require
//		//is used to load the module.
//
//		//Now export a value visible to Node.
//		//module.exports = function () {};
//		module.exports = require('../node_modules/natural/index');
//	}
//);

//var requirejs = require('requirejs');
//
//requirejs.config({
//    //Use node's special variable __dirname to
//    //get the directory containing this file.
//    //Useful if building a library that will
//    //be used in node but does not require the
//    //use of node outside
//    baseUrl: "../node_modules",
//
//    //Pass the top-level main.js/index.js require
//    //function to requirejs so that node modules
//    //are loaded relative to the top-level JS file.
//    nodeRequire: require
//});

//requirejs([ 'natural' ],
//function   (natural) {
//    //foo and bar are loaded according to requirejs
//    //config, but if not found, then node's require
//    //is used to load the module.
//
//    //Now export a value visible to Node.
//    //module.exports = function () {};
//    module.exports = require('../node_modules/natural/index');
//});

//require([ 'jquery', 'devoxx', 'tfidf' ], 
//	function($, devoxx, tfidf) {
//		console.log("jquery devoxx and tfidf loaded...");
//		devoxx.init();
//	}
//);

require([ 'jquery', 'devoxx' ], 
		function($, devoxx) {
			console.log("jquery devoxx and tfidf loaded...");
			devoxx.init();
		}
	);