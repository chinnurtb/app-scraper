var path = require('path'),
    fs = require('fs');

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


