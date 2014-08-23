var url = window.location.href;

if (url.indexOf("localhost") != -1) {
	var serviceURL = "http://localhost/dev/devverse/public/watch/";
} else{
	var serviceURL = "http://devverse.com/public/watch/";
}

var app_name = "Watchify";
var page_title = "Watchify";