var AppStoreInfo = require('./appStoreInfo.js'),
    PlayStoreInfo = require('./playStoreInfo.js');

var AppInfo = function(websiteUrl){
    this.websiteUrl = websiteUrl || '';
    this.sellerUrl = this.websiteUrl;
    this.websiteName = '';
    this.appStoreInfo = null;
    this.playStoreInfo = null;
    this.appStoreUrl = null;
    this.playStoreUrl = null;
    this.appStoreId = null;
}

module.exports = exports = {
    AppInfo: AppInfo,
    AppStoreInfo: AppStoreInfo,
    PlayStoreInfo: PlayStoreInfo
};
