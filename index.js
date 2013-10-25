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

	async.series(
	    [
		function(callback){
		    console.log( "Starting appStoreUrl for "+app.websiteName );
		    utils.getWebsiteiOSAppUrl(app.websiteUrl, function(url){
			app.appStoreUrl = url;
			callback(null);
		    });
		},
		function(callback){
		    console.log( "Starting appStoreId for "+app.websiteName );
		    utils.getWebsiteiOSAppId(app.websiteUrl, function(id){
			app.appStoreId = id;
			callback(null);
		    });
		},
		function(callback){
		    console.log( "Starting playStoreUrl for "+app.websiteName );
		    utils.getWebsiteAndroidAppUrl(app.websiteUrl, function(url){
			app.playStoreUrl = url;
			callback(null);
		    });
		},
		function(callback){
		    console.log( "Starting appStoreInfo for "+app.websiteName );
		    appStore.findAppByName(app.websiteName, function(err, res){
			if(err) callback(err);
			else {
			    if(!res)
				app.appStoreInfo = "No info found";
			    app.appStoreInfo = res;
			    callback(null);
			}
		    });
		},
		function(callback){
		    if(!app.appStoreId){
			callback(null);
		    }
		    else {
			console.log( "Starting appStoreInfo with id for "+app.websiteName );
			appStore.findAppById(app.appStoreId, app.appwebsiteName, function(err, res){
			    if(err) callback(err);
			    else {
    				if(!res)
				    app.appStoreInfo = "No info found";
				app.appStoreInfo = res;
				callback(null);
			    }
			});
		    }
		},
		function(callback){
		    console.log( "Starting playStoreInfo for "+app.websiteName );
		    playStore.findAppByName(app.websiteName, function(err, res){
			if(err) callback(err);
			else {
			    if(!res)
				app.playStoreInfo = "No info found";
			    else
				app.playStoreInfo = res;
			    callback(null);
			}
		    });
		}
	    ],
	    function(err){
		console.log( "processing finished" );
		console.log( JSON.stringify(listApps, null, 4) );
		utils.writeResultsToFile(JSON.stringify(listApps, null, 4));
	    });
    });
});

noodle.stopCache();
