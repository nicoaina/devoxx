require(["jquery"], function($) {
    //the devoxx.js plugins have been loaded.
    $(function() {
        console.log('jquery loaded...');
    });
});

require(["devoxx"], function($, devoxx) {
    //the devoxx.js plugins have been loaded.
    $(function() {
        console.log('devoxx loaded...');
    });
});

//require(["jquery", "devoxx"], function($, devoxx) {
    //the devoxx.js plugins have been loaded.
  //  $(function() {
    //    console.log('jquery and devoxx loaded...');
		//devoxx.init();
    //});
//});