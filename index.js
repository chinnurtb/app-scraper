#!/usr/bin/env node

var async = require('async'),
    noodle = require('noodlejs'),
    program = require('commander'),
    utils = require('./lib/utils.js'),
    query = require('./lib/query/'),
    models = require('./lib/model/'),
    appStore = require('./lib/appStore/'),
    playStore = require('./lib/playStore/');

var appVersion = require('./package.json').version;
var config = require('./config/config.json');
playStore.init(config);

noodle.configure({
    debug: false
});

program
    .version(appVersion)
    .usage('[options] <filename 1> <filename2> ...')
    .option('-u, --urls','Specify path to file with urls of websites')
    .parse(process.argv);

var listApps = utils.loadWebsites();

listApps.forEach(function(app){
    utils.getWebsiteName(app.websiteUrl, function(name){
	app.websiteName = name;
	try{
	    appStore.findAppByName(app.websiteName, function(res){
		console.log( "*************Apple*************" );
		console.log( res );
	    });
	}
	catch(err){
	    console.log( "Failed to find information in the appstore because "+err );
	}

	try{
	    playStore.findAppByName(app.websiteName, function(res){
		console.log( "*************Android*************" );
		console.log( res );
	    });
	}
	catch(err){
	    console.log( "Failed to find information in the playstore because "+err );
	}

    });
});

noodle.stopCache();
