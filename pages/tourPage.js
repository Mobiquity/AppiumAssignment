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
        log.info("Found done button, about to click it");
        el.click(bs.HandleErrors(done, function(err) {
            log.info("About to acccept 'use location alert'");
            // browser.dismissAlert(bs.HandleErrors(done, function(err) {
            //     log.info("Problem accepting alert? " + err);
                 done();
            // }));
        }));
    }));
}


module.exports = tourPage;
