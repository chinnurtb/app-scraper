var request = require('request');

exports = module.exports = appleSearch = {};

appleSearch.findApp = function(appName, callback){
    if(!appName){
	throw new Error("Can't query App store without app name");
    }
    var url = "https://itunes.apple.com/search?media=software&term="+appName+"&limit=3";
    request.get(url, function(err, response, body){
	if(response.statusCode == 200){
	    callback(body);
	}
    });
};
