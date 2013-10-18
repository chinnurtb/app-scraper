var AppStoreInfo = require('./appStoreInfo.js'),
    PlayStoreInfo = require('./playStoreInfo.js');

var AppInfo = function(websiteUrl){
    this.websiteUrl = websiteUrl || '';
    this.sellerUrl = this.websiteUrl;
    this.websiteName = '';
    this.AppStoreInfo = '';
    this.playStoreInfo = '';
}

module.exports = exports = AppInfo;
