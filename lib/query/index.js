var noodle = require('noodlejs'),
    async = require('async');
kexports = module.exports = query = {};

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

query.createQueries = function(url, selectors, extract){
    var queries = new Array();
    var q = {
	    url: url,
	    cache: false
    };
    if(extract){
	q.extract = extract;
    }
	
    selectors.forEach(function(item){
	q.selector = item;
	queries.push(q);
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
	
query.queryWebsiteForUrls = function(url, callback){
    var queries = query.createQueries(url, ["a"], ["href", "text"]);

    noodle.query(queries).
	then(function(res) {
	    callback(res.results[0].results);
	});
}

query.queryWebsiteForFilteredUrls = function(url, filter, callback){
    query.queryWebsiteForUrls(url, function(results){
	callback(results.filter(filter));
    });
};

query.queryWebsiteForAppId = function(url, callback){
    noodle.query([{
	url : url
    }]).then(function(res) {
	var webPage = res.results[0].results;
	var reg = new RegExp('<meta name="apple-itunes-app" content="app-id=(.*)"');
	var id = webPage.match(reg)[1];
	callback(id);
    });
};


