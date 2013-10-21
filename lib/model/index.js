var AppStoreInfo = require('./appStoreInfo.js'),
    PlayStoreInfo = require('./playStoreInfo.js');

var AppInfo = function(websiteUrl){
    this.websiteUrl = websiteUrl || '';
    this.sellerUrl = this.websiteUrl;
    this.websiteName = '';
    this.appStoreInfo = null;
    this.playStoreInfo = null;
}

module.exports = exports = {
    AppInfo: AppInfo,
    AppStoreInfo: AppStoreInfo,
    PlayStoreInfo: PlayStoreInfo
};
