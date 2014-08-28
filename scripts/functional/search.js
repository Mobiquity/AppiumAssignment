var bootstrap = require('../../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;

var tourPage = require('../../pages/tourPage');
var tourScreen;

var sessionid;
var sessionurl;

describe('My Order - Open & Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        tourScreen = new tourPage(browser);

        log.info("About to run browser init with desired options");
        bootstrap.desired.name="My Order - Search Tests";
        browser.init(bootstrap.desired).then(function(adb) {
            log.info("Successfully initialized the browser.");
            browser.getSessionId().then(function(sid) {
                process.env["SauceOnDemandSessionID"] = sid;
                process.env["job-name"] = bootstrap.desired.name;

                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;

                //bootstrap.writeToFile(bootstrap.desired.name + " - " + sessionurl);
            });

            return;

        }).nodeify(done);
    });

    after(function(done) {
        browser.quit().nodeify(done);
    });
    
    // it('Initiated', function(done) {
    //     done();
    // });

    it('Should let me search', function(done) {
        tourScreen.clickDoneAndDismissLocationServices(bootstrap.HandleErrors(done, function(err) {

            // TODO: Do the search!
            done();
        })); 
    })
}); // Final Describe

