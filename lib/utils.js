var path = require('path'),
    fs = require('fs'),
    program = require('commander'),
    AppInfo = require('./model/').AppInfo,
    query = require('./query/');

module.exports = exports = utils = {};

utils.endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

utils.startsWith = function(str, prefix) {
    return str.indexOf(prefix) === 0;
}

utils.getRelativePath = function(fileName) {
    return path.join(process.cwd(), fileName);
}

utils.contains = function(str, substring){
    return str.indexOf(substring) !== -1;
};

utils.extractNameFromUrl = function(url){
    var str = url.match(new RegExp("http://(.*)"))[1];
    var ind = str.lastIndexOf(".");
    return str.substring(0, ind);
};


utils.loadFromJson = function(toArray, pathToJson){
    var list = require(pathToJson);
    list.forEach(function(item){
	toArray.push(item);
    });
}

utils.loadFromTxt = function(toArray, pathToTxt){
    var res = fs.readFileSync(pathToTxt, 'utf-8');
    res.split('\n').filter(function(item){
	return item.length > 0;
    }).forEach(function(item){
	if(!utils.contains(item, "http://"))
	    item = "http://"+item;
	toArray.push(item)
    });
}

utils.getWebsiteName = function(websiteUrl, callback){
    var names = new Array();
    
    query.queryWebsiteForName(websiteUrl, function(results){
	results.forEach(function(item){
	    if(!item.error){
		names = names.concat(item.results);
	    }
	});

	//Look for links to home page, and copy text inside
	query.queryWebsiteForUrls(websiteUrl, function(results){
	    results.forEach(function(item) {
		if(websiteUrl === item.href){
		    names.push(item.text.replace(/\W/g, ''));
		}
	    });

	    
	    //Finally, just use the url as websiteName
	    names.push(utils.extractNameFromUrl(websiteUrl));

	    //Filter the array one last time
	    var res = names.filter(function(str){
		return !!str;
	    });

	    //For now, we return only first name found
	    callback(res[0]);
	});
    }); 
}

utils.getWebsiteiOSAppUrl = function(websiteUrl, callback){
    query.queryWebsiteForFilteredUrls(websiteUrl, function(item){
	return utils.contains(item.href, "itunes.apple.com/us/app");
    }, function(results){
	if(!results.length)
	    callback(null);
	else
	    callback(results[0].href);
    });
};

utils.getWebsiteiOSAppId = function(websiteUrl, callback){
    query.queryWebsiteForAppId(websiteUrl, function(id){
	callback(id);
    });
};

utils.getWebsiteAndroidAppUrl = function(websiteUrl, callback){
    query.queryWebsiteForFilteredUrls(websiteUrl, function(item){
	    return utils.contains(item.href, "play.google.com");
	}, function(results){
	    if(!results.length)
		callback(null);
	    else
		callback(results[0].href);
    });    
};

utils.loadWebsites = function(){
    var listApps = [];
    if(program.urls){
	var listWebsites = [];
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

	listWebsites.forEach(function(website){
	    listApps.push(new AppInfo(website));
	});
    }
    return listApps;
};

utils.writeResultsToFile = function(str){
    try{
	fs.writeFileSync(path.join(process.cwd(), 'results.json'), str);
    } catch(err){
	console.log( "Could not write results to external file because "+err );
    }
};

