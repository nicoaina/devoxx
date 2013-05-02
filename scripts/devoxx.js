//define(function() {
define(['gmaps'], function() {

	var files, 
		reset,
		list, 
		map, 
		tweets;
	
	var markersArray = [];

	function handleFileSelect(evt) {

		var files = evt.target.files; // FileList object

		for ( var i = 0, f; f = files[i]; i++) {

			var pageNumber = /([0-9]+)/.exec(f.name)[0];

			var tablePageId = [];
			if (document.getElementById("tweets_page" + pageNumber) == null) {
				tablePageId[i] = document.createElement("table");
				tablePageId[i].id = 'tweets_page' + pageNumber;
			} else {
				continue;
			}

			var fileDiv = [];
			if (document.getElementById("div_page" + pageNumber) == null) {
				fileDiv[i] = document.createElement("div");
				fileDiv[i].id = 'div_page' + pageNumber;
			} else {
				continue;
			}
			fileDiv[i].innerText = 'page' + pageNumber;

			var tweets_per_page = "";
			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(table, i) {
				return function(onloadEvent) {
					tweets_per_page = onloadEvent.target.result;
					var tweets = eval('(' + tweets_per_page + ')');

					for ( var j = 0, result; result = tweets.results[j]; j++) {

						var tweetRow = document.createElement("tr");
						var textColumn = document.createElement("td");
						var lontLatColumn = document
								.createElement("td");

						textColumn.innerText = result.text;
						if (result.geo !== null) {
							lontLatColumn.innerText = result.geo.coordinates[0]
									+ ';' + result.geo.coordinates[1];
							addPosition(result.geo.coordinates[0],
									result.geo.coordinates[1]);
						}
						tweetRow.insertBefore(lontLatColumn, null);
						tweetRow
								.insertBefore(textColumn, lontLatColumn);
						table[i].appendChild(tweetRow);

					}

				};
			})(tablePageId, i);

			reader.readAsText(f);

			var linkSrc = document.createElement('a');
			linkSrc.href = '#' + 'div_page' + pageNumber;
			linkSrc.innerText = f.name;
			var br = document.createElement('br');
			linkSrc.appendChild(br);
			document.getElementById('list').insertBefore(linkSrc, null);

			var linkTarget = document.createElement('a');
			linkTarget.id = 'div_page' + pageNumber;
			linkTarget.innerText = f.name;

			var returnTop = document.createElement("a");
			returnTop.href = '#' + 'list';
			returnTop.innerText = 'Retourner en haut';
			returnTop.style.marginLeft = '15px';

			var navigatorDiv = document.createElement("div");
			navigatorDiv.appendChild(tablePageId[i]);
			navigatorDiv.insertBefore(returnTop, tablePageId[i]);
			navigatorDiv.insertBefore(linkTarget, returnTop);

			// set null as second arg if u want the tweets to be
			// presented in the reverse order
			tweets.insertBefore(navigatorDiv, document
					.getElementById("tweets").firstChild);
		}
	}

	function addPosition(lat, lng) {
		var location = new google.maps.LatLng(lat, lng);

		var marker = new google.maps.Marker({
			position : location,
			map : map,
		});

		// needed to be able to clear the map
		markersArray.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content : 'Latitude: ' + location.lat() + '<br>Longitude: '
					+ location.lng()
		});
		infowindow.open(map, marker);
	}

	function initializeMap() {
		var mapProp = {
			center : new google.maps.LatLng(51.508742, -0.120850),
			zoom : 5,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("googleMap"),
				mapProp);
	}

	function initGlobalVars() {
		files = document.getElementById("files");
		reset = document.getElementById("reset");
		list = document.getElementById("list");
		map = document.getElementById("googleMap");
		tweets = document.getElementById("tweets");
	}

	function initFileApi() {
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList
				&& window.Blob) {
			// Great success! All the File APIs are supported.
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
	}

	function initListeners() {
		files.addEventListener('change', handleFileSelect, false);
		reset.addEventListener('click', clearPage, false);
	}

	function clearPage() {
		// clear tweets
		while (tweets.firstChild) {
			tweets.removeChild(tweets.firstChild);
		};

		// clear file list
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		};

		// clear Reset button
		if (files != null) {
			files.remove();
			files = document.createElement('input');
			files.type = 'file';
			files.id = 'files';
			files.name = 'files[]';
			files.multiple = true;

			document.body.insertBefore(files, document.body.firstChild);
			files.addEventListener('change', handleFileSelect, false);
		}

		// clearMap
		for ( var i = 0; i < markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
	}
	
//	function init() {
//			initGlobalVars();
//			initializeMap();
//			initFileApi();
//			initListeners();
//	}
	
	return {
		init : function() {
			initGlobalVars();
			initializeMap();
			initFileApi();
			initListeners();
		}
	}
});