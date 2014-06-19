var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;

var loginPage = require('../pages/loginPage');
var login;
var sessionid;
var sessionurl;

describe('3RB Login - Open Browser', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        login = new loginPage(browser);

        //log.info("About to run browser init with desired options");
        bootstrap.desired.name="3rb - Initialize Environment";
        browser.init(bootstrap.desired).then(function(adb) {
            log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                    process.env["SauceOnDemandSessionID"] = sid;
                    process.env["job-name"] = bootstrap.desired.name;

                    sessionid = sid;
                    sessionurl = "https://saucelabs.com/tests/" + sid;

                    bootstrap.writeToFile("3RB Login - " + sessionurl);
                });

            return;

        }).nodeify(done);
    });

	it('Initiated', function(done) {
		done();
	});


    it('C8033 - Valid Login', function(done) {
        login.validLogin(function(err) {
            if(err) {
                done(err);
            }
            else {
                login.logout(function(err) {
                    done(err)
                });
            }
        });
    });


    // describe('3RB Authentication Tests', function() {
    //     this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    //     before(function(done) {
    //         login = new loginPage(browser);
    //         done();
    //     });


    //     // TODO: Add it's for negative login tests

    // });  // Login test Describes
}); // File Describe




// describe('3RB Login', function() {
//     this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator  

//     before(function(done) {
//         login = new loginPage(browser);
// 		done();
//     });

//     after(function(done) {
//         //log.info("In done");		
//         browser.quit().nodeify(done); // Close the App
//     });

//     it('C8034 - Step 1', function(done) {
//         login.loginNegativeResults(done);
//     });
	
//     it('C8034 - Step 2', function(done) {
//         login.loginNegativeResults(done);
//     });
	
//     it('C8034 - Step 3', function(done) {
//         login.loginNegativeResults(done);
//     });
	
// });
