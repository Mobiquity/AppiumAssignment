AppiumAssignment
================

Assignment 1

* Install Appium (http://appium.io/)
* What is Appium? Read all about it! How is it like Selenium?
* Set up your iOS app
  * git clone https://github.com/MyOrder/MobileApp-iOS (if you have access)
  	* If no access, get the .app from Elise
  	* Otherwise build for iPhone 4" Retina
* Start the Appium server
* Set up the path to your .app file under the "apple"
* Set up the "apple" to run the iPhone 4" 32bit
* Run the appium "doctor" to see if everything looks Okay
* Click Launch (starts the Appium server)
* Run the initial tests in the scripts/functional folder with `mocha scripts/functional/search.js`
* When you have 1 passing, assignment done!

Assignment 2

* Add a new portion to the existing test to do the "search"
	* Click the "Search" icon
	* Type "Ams" into the search field 
	* Verify that the first link that shows up is "Amsterdam" - you may need to wait until this is present as you type
	
Assignment 3

* Go to the home page and implement a swipe to scroll the page to the bottom
* Click on the "Present Icon"
* Verify that 4 locations are present

  
