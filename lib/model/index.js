var AppInfo = function(websiteUrl){
    this.websiteUrl = websiteUrl || '';
    this.sellerUrl = this.websiteUrl;
    this.websiteName = '';
}

module.exports = exports = AppInfo;

AppInfo.prototype.setUrl = function(url){
    this.websiteUrl = url;
};

AppInfo.prototype.setWebsiteName = function(name){
    this.websiteName = name;
}
