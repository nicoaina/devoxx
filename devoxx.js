function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	for ( var i = 0, f; f = files[i]; i++) {

		var pageNumber = /([0-9]+)/.exec(f.name)[0];

		var tablePage;
		if (document.getElementById("tweets_page" + pageNumber) === null) {
			tablePage = document.createElement("table");
			tablePage.id = 'tweets_page' + pageNumber;
		} else {
			continue;
		}

		var fileDiv;
		if (document.getElementById("div_page" + pageNumber) === null) {
			fileDiv = document.createElement("div");
			fileDiv.id = 'div_page' + pageNumber;
		} else {
			continue;
		}
		fileDiv.innerText = 'page' + pageNumber;

		var linkTarget = document.createElement('a');
		linkTarget.href = 'devoxx.html#' + 'page' + pageNumber;
		linkTarget.innerText = f.name;
		
		var tweets_per_page = "";
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				tweets_per_page = e.target.result;
				var tweets = eval('(' + tweets_per_page + ')');
				for ( var j = 0, result; result = tweets.results[j]; j++) {

					var tweetRow = document.createElement("tr");
					var textColumn = document.createElement("td");
					var lontLatColumn = document.createElement("td");

					textColumn.innerText = result.text;
					if (result.geo !== null) {
						lontLatColumn.innerText = result.geo.coordinates[0]
								+ ';' + result.geo.coordinates[1];
					}
					tweetRow.insertBefore(lontLatColumn, null);
					tweetRow.insertBefore(textColumn, lontLatColumn);
					tablePage.appendChild(tweetRow);
				}
			};
		})(f);

		reader.readAsText(f);
		var linkSrc = document.createElement('a');
		linkTarge.name = 'page' + pageNumber;
		linkSrc.innerText = f.name;
		var br = document.createElement('br');
		link.appendChild(br);

		document.getElementById('list').insertBefore(span, null);
		document.getElementById("tweets").insertBefore(fileDiv, null);
		document.getElementById("tweets").insertBefore(tablePage, null);
	}

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
