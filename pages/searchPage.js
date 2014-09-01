var wd = require('wd');
var asserters = wd.asserters;
var bs = require('../bootstrap');
var log = bs.log;
var browser;

// Page Elements Here
var pageObjects = {
	searchXPath: "//UIAApplication[1]/UIAWindow[1]/UIATextField[1]",
    firstResultXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[2]/UIATableCell[1]/UIAStaticText[1]"
};

var searchPage = function(theBrowser) {
    log.info("Creating Tour Page object");

    this.browser = theBrowser;
    browser = theBrowser;
};

searchPage.prototype.typeInSearch = function(textToType, done) {
    browser.waitForElementByXPath(pageObjects.searchXPath, asserters.isDisplayed, 5000, 500, bs.HandleErrors(done, function(err, el) {
        el.sendKeys(textToType, function(err) {
            if(err) {
                done(err);
            }
            else {
                done();
            }
        })
    }));
}

searchPage.prototype.getFirstResultText = function(textToType, done) {
    browser.waitForElementByXPath(pageObjects.firstResultXPath, asserters.isDisplayed, 5000, 500, bs.HandleErrors(done, function(err, el) {
        el.text(function(err, txt) {
            log.info("Got text from first result? " + err + " of value: " + txt + "...");
            if(err) {
                done(err);
            }
            else {
                done(null, txt);
            }
        })
    }));
}
module.exports = searchPage;
