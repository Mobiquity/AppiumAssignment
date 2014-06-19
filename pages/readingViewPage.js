var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
var browser;

// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

// NOTE1: this is testing Kokapena as a test app
//  https://ease.apperian.com/index.php/application/28459/appdetails#detailsTab-tab

// // Page Elements Here
var readingPageObjects = {
	documentXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[2]",	
	creditsSectionXPath: "//UIAApplication[1]/UIAWindow[1]/UIATableView[1]/UIATableCell[1]/UIAStaticText[1]",
	pagesCollectionXPath: "//UIAApplication[1]/UIAWindow[1]/UIACollectionView[1]"
};

var readingPage = function(theBrowser) {
    browser = theBrowser;
};

readingPage.prototype.clickDocument = function(done) {
	browser.elementByXPath(readingPageObjects.documentXPath, function(err, el) {
		el.click(function() {
			setTimeout(function() {
				done();
			}, 4000);
		});
	});	
}; 

readingPage.prototype.clickCreditsSection = function(done) {
	browser.elementByXPath(readingPageObjects.creditsSectionXPath, function(err, el) {
		el.click(function() {
			setTimeout(function() {
				done();
			}, 2000);
		});
	});	
}; 

readingPage.prototype.swipeRTL = function(done) {
	browser.elementByXPath(readingPageObjects.pagesCollectionXPath, function(err, el) {
		el.click(function() {
			var swipeOpts = {
			      duration: 0.7,
				  startX: 686,
			      startY: 561,
				  endX: 278,
			      endY: 561
			    };
			browser.execute("mobile: swipe", [swipeOpts]);
			browser.sleep(0.5);
			done();
		});
	});	
}; 

readingPage.prototype.swipeLTR = function(done) {
	browser.elementByXPath(readingPageObjects.pagesCollectionXPath, function(err, el) {
		el.click(function() {
			var swipeOpts = {
			      duration: 0.7,
				  startX: 81,
			      startY: 542,
				  endX: 413,
			      endY: 542
			    };
			browser.execute("mobile: swipe", [swipeOpts]);
			browser.sleep(0.5);
			done();
		});
	});	
}; 

module.exports = readingPage;

