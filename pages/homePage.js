var wd = require('wd');
var bs = require('../bootstrap');
var log = bs.log;
var browser;

// Page Elements Here
var pageObjects = {
	searchButtonXPath: "//UIAApplication[1]/UIAWindow[1]/UIAButton[2]"
};

var homePage = function(theBrowser) {
    log.info("Creating Home Page Object");

    this.browser = theBrowser;
    browser = theBrowser;
};

homePage.prototype.clickSearch = function(done) {
    try {
        log.info("Looking for element");
        browser.waitForElementByXPath(pageObjects.searchButtonXPath, bs.HandleErrors(done, function(err, el) {
            log.info("Found search button, about to click it");
            el.click(bs.HandleErrors(done, function(err) {
                done();
            }));
        }));
    }
    catch(e) {
        done("oops: " + e)
    }
}


module.exports = homePage;
