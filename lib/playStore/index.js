var exec = require('child_process').exec,
    path = require('path');


exports = module.exports = store = {};

store.init = function(config){
    this.marketEmail = config.playStore.emailAddress;
    this.marketPassword = config.playStore.password;
    this.pathToJava = config.environment.pathToJava || 'java';
    this.androidMarketAPI = config.playStore.androidMarketAPIJar;
}


store.findApp = function(appName, callback){
    var pathToJar = path.join(process.cwd(), this.androidMarketAPI);
    var command = this.pathToJava + ' -jar ' + pathToJar +
	          this.marketEmail + this.marketPassword + appName;
    var child_process = exec(command, function(err, stdout, stderr){
	if(err)
	    throw err;
	else {
	    
}

