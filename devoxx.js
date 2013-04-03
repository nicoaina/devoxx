function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var file = [];
	for ( var i = 0, f; f = files[i]; i++) {
		file.push('<li><strong>', escape(f.name), '</strong> (', f.type
				|| 'n/a', ') - ', f.size, ' bytes, last modified: ',
				f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString()
						: 'n/a', '</li>');

		var tweets_per_page = "";
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				tweets_per_page = e.target.result;
				var tweets = eval('(' + tweets_per_page + ')');
				for ( var j = 0, result; result = tweets.results[j]; j++) {
					var tweetDiv = document.createElement("div");
					tweetDiv.id = 'tweets_page' + (i + 1);
					tweetDiv.innerHTML = result.text;
					document.getElementById("tweets").appendChild(tweetDiv);
				}
			};
		})(f);

		reader.readAsText(f);
	}

	document.getElementById('list').innerHTML = '<ul>' + file.join('')
			+ '</ul>';

	document.getElementById('files').addEventListener('change',
			handleFileSelect, false);
}

function initializeMap() {
	var mapProp = {
		center : new google.maps.LatLng(51.508742, -0.120850),
		zoom : 5,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	google.maps.event.addDomListener(window, 'load', initializeMap);
}

