var exec = require('child_process').exec,
    path = require('path');


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
	+ ' ' + this.androidId + ' ' + appName + ' 1';
    var child_process = exec(command, function(err, stdout, stderr){
	if(err || stderr)
	    throw err || stderr;
	else {
	    console.log( "stderr"+stderr );
	    callback(stdout);
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
