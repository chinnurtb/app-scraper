var noodle = require('noodlejs'),
    async = require('async');
exports = module.exports = query = {};

query.queryWebsite = function (url, selector, callback) {
    if(typeof selector === 'function'){
	callback = selector;
	selector = undefined;
    }

    var query = {
	url: url,
	cache: false,
    };

    if(selector)
	query.selector = selector;
    
    callback(noodle.query(query));
}

query.createQueries = function(url, selectors){
    var queries = new Array();
    selectors.forEach(function(item){
	queries.push({
	    url: url,
	    cache: false,
	    selector: item
	});
    });

    return queries;
}

query.queryWebsiteForName = function(url, callback){
    var queries = query.createQueries(url, [
	"a.logo",
	"a#logo",
	".logo",
	"#logo"
	]);

    noodle.query(queries).
	then(function(res){
	    callback(res.results);
	});
}
	
