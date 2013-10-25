var request = require('request'),
    AppStoreInfo = require('../model/').AppStoreInfo;

exports = module.exports = appleSearch = {};

appleSearch.findAppByName = function(appName, callback){
    if(!appName){
	callback(new Error("Can't query App store without app name"));
    }
    var url = "https://itunes.apple.com/search?media=software&term="+appName+"&limit=3";
    request.get(url, function(err, response, body){
	if(response.statusCode == 200){
	    
	    var results = scrapeAppStoreInfo(appName, JSON.parse(body).results);
	    
	    //results is an array of AppStoreInfo objects
	    callback(null, appleSearch.getBestResult(results));
	}
    });
};

appleSearch.findAppById = function(appId, appName, callback){
    if(!appId){
	callback(new Error("Can't query App store without app id"));
    }
    var url = "https://itunes.apple.com/lookup?id="+appId+"&entity=software";
    request.get(url, function(err, response, body){
	if(response.statusCode == 200){
	    
	    var results = scrapeAppStoreInfo(appName, JSON.parse(body).results);
	    
	    //results is an array of AppStoreInfo objects
	    callback(null, appleSearch.getBestResult(results));
	}
    });

};


appleSearch.findAppByQuery = function(query, callback){}

appleSearch.findAppByPackageName = function(packageName, callback){}

appleSearch.getBestResult = function(results){
    if(!results.length)
	return null;
    return results[0];
};

var scrapeAppStoreInfo = function(appName, results){
    var infos = [];

    results.forEach(function(result){
	var info = new AppStoreInfo(appName);
	info.sellerName = result.sellerName;
	info.artistName = result.artistName || result.sellerName;
	info.price = result.price;
	info.version = result.version;
	info.description = result.description;
	info.releaseDate = new Date(result.releaseDate);
	info.trackName = result.trackName;
	info.genre = result.primaryGenreName;
	info.sellerUrl = result.sellerUrl;
	info.appStorePage = result.trackViewUrl;

	infos.push(info);
    });

    return infos;
}
