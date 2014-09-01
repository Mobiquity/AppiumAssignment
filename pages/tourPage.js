var wd = require('wd');
var bs = require('../bootstrap');
var log = bs.log;
var browser;

// Page Elements Here
var pageObjects = {
	doneName: "Done"
};

var tourPage = function(theBrowser) {
    log.info("Creating Tour Page object");

    this.browser = theBrowser;
    browser = theBrowser;
};

tourPage.prototype.clickDoneAndDismissLocationServices = function(done) {
    browser.waitForElementByName(pageObjects.doneName, bs.HandleErrors(done, function(err, el) {
        el.click(bs.HandleErrors(done, function(err) {
            browser.dismissAlert(bs.HandleErrors(done, function(err) {
                done();
            }));
        }));
    }));
}

tourPage.prototype.clickDoneAndDismissLocationServicesPromise = function() {
    log.info("In clickDoneAndDismissLocationServicesPromise" + err);

    return browser.waitForElementByName(pageObjects.doneName).then(function(err, el) {
        log.info("In clickDoneAndDismissLocationServicesPromise - found element? " + err);
        el.click().dismissAlert();;
    })
}

module.exports = tourPage;
