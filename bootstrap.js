"use strict";

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var wd = require('wd');

exports.log = require('custom-logger').config({ level: 0 });
exports.log.info().config({ color: 'green', format: '%event% - %message%' });

exports.MaxWaitTime = 120000;


///////////////////////////////////////////////////////////////////////////
// TODO: EDIT THIS DEPENDING ON WHERE YOU ARE RUNNING THE THING
// MAKE SURE THAT YOUR LOCAL PATH IS SPECIFIC TO YOUR MACHINE
// TODO: PUT THIS IN A CONFIG FILE THAT IS NOT IN GITHUB
///////////////////////////////////////////////////////////////////////////
var onSauce = false;
var localProjectPath = "/Users/ecarmichael/Library/Developer/Xcode/DerivedData/3rbPOC-ccxhuumqhwbwtvheqaptxtykuayq/Build/Products/Debug-iphonesimulator/3rbPOC.app";
//var localProjectPath = "/Users/sidar/Library/Developer/Xcode/DerivedData/3rbPOC-eqdzbgrjsbmxkchidgaxuaqnyitm/Build/Products/Debug-iphonesimulator/3rbPOC.app";
var sauceProjectPath = "sauce-storage:3rbPOC.zip";

var nameOfTestLinkFile = "SauceResults.xml";

var host = "localhost";
var port = 4723; 
var pathToProject;
//var localProjectPath = "/Users/sidar/Library/Developer/Xcode/DerivedData/3rbPOC-eqdzbgrjsbmxkchidgaxuaqnyitm/Build/Products/Debug-iphonesimulator/3rbPOC.app";

var fs = require('fs');

exports.writeToFile = function(content) {
    fs.appendFile(nameOfTestLinkFile, content + "\n\n", function(err) {
        if(err) {
            exports.log.warn(err);
        } else {
            exports.log.info("The test link file was saved!");
        }
    }); 
}

fs.unlink(nameOfTestLinkFile, function(err) {
    if(err) {
        exports.log.warn(err);
    } else {
        exports.log.info("The test link file was removed!");
    }
});
    
exports.writeToFile("Sauce Test Reults");


if(onSauce) {
    host = 'ondemand.saucelabs.com';
    port = 80;
    var username = 'mobiquity';
    var accessKey = '75b72184-3f8d-45d5-ae04-8d79d2b06ccb';
    pathToProject = sauceProjectPath;
    exports.browser = wd.promiseChainRemote(host, port, username, accessKey);

    exports.desired = {
        name:"3rb POC - authentication suite",
        browserName:"ipad",
        platform:"OS X 10.8",
        version:"6.0",
        deviceName:"iPad Simulator",
        app:pathToProject
    };

    exports.desired['appium-version'] = "1.0";
}
else { // Run the test locally
    pathToProject = localProjectPath;
    exports.browser = wd.promiseChainRemote(host, port);

    exports.desired = {
        name:"3rb POC - authentication suite",
        browserName:"ipad",
        platform:"OS X 10.8",
        version:"6.0",
        deviceName:"iPad Simulator",
        app:pathToProject
    };

    exports.desired['appium-version'] = "1.0";

}