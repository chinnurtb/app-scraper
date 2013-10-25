var exec = require('child_process').exec,
    path = require('path'),
    PlayStoreInfo = require('./../model/').PlayStoreInfo;

exports = module.exports = store = {};

store.init = function(config){
    this.marketEmail = config.playStore.emailAddress;
    this.marketPassword = config.playStore.password;
    this.pathToJava = config.environment.pathToJava || 'java';
    this.dependencies = getDependencyList(config.playStore.dependencies);
    this.mainLibClass = config.playStore.mainLibClass;
    this.androidId = config.playStore.androidId;
}

store.findAppByName = function(appName, callback){
    var command = this.pathToJava + ' -cp ' + this.dependencies
	+ ' ' + this.mainLibClass+ ' ' + ' ' + this.marketEmail + ' ' + this.marketPassword
	+ ' ' + this.androidId + ' ' + appName + ' 3';

    var child_process = exec(command, function(err, stdout, stderr){
	if(err || stderr)
	    callback(err || stderr);
	else {
	    var results = scrapePlayStoreInfo(appName, stdout);

	    //results is an array of PlayStoreInfo objects
	    callback(null, store.getBestResult(results));
	}
    });
}			    

store.findAppByQuery = function(query, callback){}

store.findAppByPackageName = function(packageName, callback){}

store.getBestResult = function(results){
    if(!results.length)
	return null;
    return results[0];
}


var getDependencyList = function(dependencies){
    var isWin = !!process.platform.match(/^win/);

    //In Windows, jar dependencies are semi-colon-separated
    return dependencies.join(isWin? ";" : ":");
}

var scrapePlayStoreInfo = function(appName, stdoutStr){
    var results = [];
    if(utils.startsWith(stdoutStr, "Could not")){
	return results;
    }

    stdoutStr = stdoutStr.substr(2);
    stdoutStr = stdoutStr.substr(0, stdoutStr.length -2);

    var arrayObjs = stdoutStr.split("}\n,\n{");
    arrayObjs.forEach(function(strObj){
	var info = new PlayStoreInfo(appName);
	info.appName = strObj.match(/title: "(.*)"/)[1] ;
	info.creator = strObj.match(/creator: "(.*)"/)[1];
	info.ratingCount = strObj.match(/ratingsCount: (.*)/)[1];
	info.averageRating = strObj.match(/rating: "(.*)"/)[1];
	info.packageName = strObj.match(/packageName: "(.*)"/)[1];
	info.downloadCount = strObj.match(/downloadsCountText: "(.*)"/)[1];
	info.vesion = strObj.match(/version: "(.*)"/)[1];
	info.description = strObj.match(/description: "(.*)"/)[1];
	info.genre = strObj.match(/category: "(.*)"/)[1];
	if((/contactWebsite: "(.*)"/).test(strObj))
	    info.sellerUrl = strObj.match(/contactWebsite: "(.*)"/)[1];
	info.contactUrl = info.sellerUrl;
	if((/contactEmail: "(.*)"/).test(strObj))
	    info.contactEmail = strObj.match(/contactEmail: "(.*)"/)[1];
	info.playStorePage = "https://play.google.com/store/apps/details?id="+info.packageName;
	results.push(info);
    });
    return results;    
}
