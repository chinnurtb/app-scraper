var path = require('path'),
    fs = require('fs'),
    query = require('./query/');

module.exports = exports = utils = {};

utils.endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

utils.getRelativePath = function(fileName) {
    return path.join(process.cwd(), fileName);
}

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
	toArray.push(item)
    });
}

utils.getWebsiteName = function(websiteName, callback){
    var names = new Array();
    query.queryWebsiteForName(websiteName, function(results){
	results.forEach(function(item){
	    if(!item.error){
		names = names.concat(item.results);
	    }
	});
	//For now, we return only first name found,
	//better approach is to analyze names and find common subname
	callback(names[0]);
    });
    
}
