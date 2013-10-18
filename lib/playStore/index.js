var exec = require('child_process').exec,
    path = require('path'),
    PlayStoreInfo = require('./../model/playStoreInfo.js');


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
	+ ' ' + this.androidId + ' ' + appName + ' 2';
    var child_process = exec(command, function(err, stdout, stderr){
	if(err || stderr)
	    throw err || stderr;
	else {
	    console.log( "stderr"+stderr );
	    callback(scrapePlayStoreInfo(stdout)[0]);
	}
    });
}			    

store.findAppByQuery = function(query, callback){}

store.findAppByPackageName = function(packageName, callback){}

var getDependencyList = function(dependencies){
    var isWin = !!process.platform.match(/^win/);

    //In Windows, jar dependencies are semi-colon-separated
    return dependencies.join(isWin? ";" : ":");
}

var scrapePlayStoreInfo = function(stdoutStr){
    var results = [];
    stdoutStr = stdoutStr.substr(2);
    stdoutStr = stdoutStr.substr(0, stdoutStr.length -2);

    var arrayObjs = stdoutStr.split("}\n,\n{");
    arrayObjs.forEach(function(strObj){
	var info = new PlayStoreInfo();
	info.appName = strObj.match(/title: "(.*)"/)[1] ;
	info.creator = strObj.match(/creator: "(.*)"/)[1];
	info.ratingCount = strObj.match(/ratingsCount: (.*)/)[1];
	info.averageRating = strObj.match(/rating: "(.*)"/)[1];
	info.packageName = strObj.match(/packageName: "(.*)"/)[1];
	info.downloadCount = strObj.match(/downloadsCountText: "(.*)"/)[1];
	info.vesion = strObj.match(/version: "(.*)"/)[1];
	info.description = strObj.match(/description: "(.*)"/)[1];
	info.genre= strObj.match(/category: "(.*)"/)[1];
	results.push(info);
    });

    return results;    
}
