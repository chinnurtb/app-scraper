#!/usr/bin/env node

var noodle = require('noodlejs'),
    async = require('async'),
    program = require('commander'),
    utils = require('./lib/utils.js'),
    query = require('./lib/query/');

var appVersion = require('./package.json').version;

program
    .version(appVersion)
    .usage('[options] <filename 1> <filename2> ...')
    .option('-u, --urls','Specify path to file with urls of websites')
    .parse(process.argv);

var listWebsites = [];
if(program.urls){
    process.argv.forEach(function(item, index){
	if(index >= 3) {
	    try{
		if(utils.endsWith(item, '.txt')){
		    utils.loadFromTxt(listWebsites, utils.getRelativePath(item));
		}
		else if (utils.endsWith(item, '.json')){
		    utils.loadFromJson(listWebsites, utils.getRelativePath(item));
		}
	    }
	    catch(err){
		console.log( "Could not open file "+item+" with error "+err );
	    }
	}
    });
}

console.log( listWebsites );
query.queryWebsiteForName(listWebsites[0], function(res){
    console.log(res);
});
/*



noodle.query({
    url: "http://dolphin.com",
    selector: ".logo",
    cache: false
})
.then( function(results) {
    console.log( JSON.stringify(results) );
})
.fail(function(error) {
    console.log( "error"+error );
});


*/
