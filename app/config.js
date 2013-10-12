var url = window.location.href;

if (url.indexOf("localhost") != -1) {
	var serviceURL = "http://localhost/dev/devverse/public/running/";
} else{
	var serviceURL = "http://devverse.com/public/running/";
}

var app_name = "RUN for Men";
var page_title = "RUN";