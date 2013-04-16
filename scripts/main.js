require(["devoxx"], function(Devoxx) {
    //the devoxx.js plugins have been loaded.
    $(function() {
        console.log('jquery and devoxx loaded...');
    });
});

require(["devoxx"], function($, devoxx) {
    //the devoxx.js plugins have been loaded.
    $(function() {
        console.log('devoxx loaded...');
		devoxx.init();
    });
});

//require(["jquery", "devoxx"], function($, devoxx) {
    //the devoxx.js plugins have been loaded.
  //  $(function() {
    //    console.log('jquery and devoxx loaded...');
		//devoxx.init();
    //});
//});