var AppStoreInfo = require('./appStoreInfo.js'),
    PlayStoreInfo = require('./playStoreInfo.js');

var AppInfo = function(websiteUrl){
    this.websiteUrl = websiteUrl || '';
    this.sellerUrl = this.websiteUrl;
    this.websiteName = '';
    this.AppStoreInfo = new AppStoreInfo();
    this.playStoreInfo = new PlayStoreInfo();
}

module.exports = exports = AppInfo;
