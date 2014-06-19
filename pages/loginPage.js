var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;

// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

// NOTE1: this is testing Kokapena as a test app
//  https://ease.apperian.com/index.php/application/28459/appdetails#detailsTab-tab

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!

// // Page Elements Here
var loginPageObjects = {
	usernameXPath: "//UIAApplication[1]/UIAWindow[1]/UIATextField[1]",
	passwordXPath: "//UIAApplication[1]/UIAWindow[1]/UIASecureTextField[1]",
	loginBtnXPath: "//UIAApplication[1]/UIAWindow[1]/UIAButton[1]",
	username: "j_buzzi@yahoo.com",
	password: "1212",
	usernameIncorrect: "not-working@mock.com",
	credentialsInvalidXPath: "//UIAApplication[1]/UIAWindow[4]/UIAAlert[1]/UIAStaticText[2]",
	credentialsInvalidOKBtnXPath: "//UIAApplication[1]/UIAWindow[4]/UIAAlert[1]/UIAButton[1]",	
	menuXPath: "//UIAApplication[1]/UIAWindow[1]/UIANavigationBar[1]/UIAButton[1]",
	logoutXPath: "//UIAApplication[1]/UIAWindow[1]/UIAPopover[1]/UIATableView[1]/UIATableCell[3]",
	confirmLogoutXPath: "//UIAApplication[1]/UIAWindow[3]/UIAAlert[1]/UIAButton[2]"	
};

var loginPage = function(theBrowser) {
    //log.info("Creating LoginPage object");

    this.browser = theBrowser;

    // Custom Exported values here
    //this.title = "Spider LMS";
    //this.location = "http://development.spiderlms.com:3000/";
};

loginPage.prototype.setUsernameTxt = function() {
    //log.info("About to set the username");
    return this.browser.waitForElementByXPath(loginPageObjects.usernameXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        //log.info("Got element back with err: " + err);
        //log.info("Got element back with element: " + el);

        return this.browser.elementByXPath(loginPageObjects.usernameXPath).sendKeys(loginPageObjects.username);
    });	
}; 

loginPage.prototype.setPasswordTxt = function() {
    return this.browser.waitForElementByXPath(loginPageObjects.passwordXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        return this.browser.elementByXPath(loginPageObjects.passwordXPath).sendKeys(loginPageObjects.password);
    });	
}; 

loginPage.prototype.clickLoginBtn = function() {
    return this.browser.waitForElementByXPath(loginPageObjects.loginBtnXPath, bootstrap.MaxWaitTime).then(function(err, el) {
        return this.browser.elementByXPath(loginPageObjects.loginBtnXPath).click();
    });	
}; 

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.validLogin = function(done) {
	this.browser.elementByXPath(loginPageObjects.usernameXPath, HandleErrors(done, function(err, el) {
        log.info("Found user name input");
		el.sendKeys(loginPageObjects.username, HandleErrors(done, function(err) {
            log.info("Typed Username");
            this.browser.elementByXPath(loginPageObjects.passwordXPath, HandleErrors(done, function(err, el) {
                log.info("Found password Input");
                el.sendKeys(loginPageObjects.password, HandleErrors(done, function(err) {
                    log.info("Typed password");
                    this.browser.elementByXPath(loginPageObjects.loginBtnXPath, HandleErrors(done, function(err, el) {
                        log.info("Found login button.")
                        el.click(function(err) {
                            done(err);
                        });
                    }));
                }));
            }));
        }));
	}));
};

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.logout = function(done) {
	this.browser.elementByXPath(loginPageObjects.menuXPath, function(err, el) {
		el.click(function() {
			this.browser.elementByXPath(loginPageObjects.logoutXPath, function(err, el) {
				el.click(function() {
					this.browser.elementByXPath(loginPageObjects.confirmLogoutXPath, function(err, el) {
						el.click(function(err) {
                            done(err);
                        });
					});
				});
			});			
		});
	});
};

// TODO: Without error handling, the app will freeze if there is an error
// Add in error handling!
loginPage.prototype.loginNegativeResults = function(done) {
	browser.elementByXPath(loginPageObjects.usernameXPath, function(err, el) {
		el.sendKeys(loginPageObjects.usernameIncorrect);
		browser.elementByXPath(loginPageObjects.passwordXPath, function(err, el) {
			el.sendKeys(loginPageObjects.password);
			browser.elementByXPath(loginPageObjects.loginBtnXPath, function(err, el) {
				el.click(function(err) {
					browser.waitForElementByXPath(loginPageObjects.credentialsInvalidOKBtnXPath, bootstrap.MaxWaitTime).then(function(err, el) { 
						browser.elementByXPath(loginPageObjects.credentialsInvalidOKBtnXPath, function(err, el) {
							el.click(function(err) {
								done(err);
							});
						});
					});
				});
			});
		});
	});
};

function HandleErrors(itDidNotWorkCB, itWorkedCB) {
    return function (err, other) {
        if (err) {
            itDidNotWorkCB(err);
        }
        else {
            itWorkedCB(null, other);
        }
    }
}

module.exports = loginPage;
