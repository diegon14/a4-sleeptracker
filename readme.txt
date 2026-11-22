--Readme document for Carlos Corona-Gonzalez, ccoronag@uci.edu diegon1@uci.edu

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?

- 12 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
- https://ionicframework.com/docs/api/button
- https://ionicframework.com/docs/api/datetime


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

- N/A


5. Is there anything special we need to know in order to run your code?

- Ioninc Storage-Angular needs to be installed using npm install @ionic/storage-angular


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

- The app was deisgned to be hybrid app that can run both on the browser and mobile device without changing the implementation of the UI.


7. Did you design your app specifically for iOS or Android, or both?

- The design was tailored more specifically for iOS but still ensured it ran on Android. The app uses overlapping conventions of iOS and Andriod. 


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

- From the home page, the user selects a the date they wanna log the sleep with the calendar. The user then selects the "Log Overnight Sleep" button, where they can select the time range and sumbit the log.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

- From the home page, the user selects the "Log Current Sleepiness" button. This will present a modal that allows the user to select their sleepiness based on the Stanford scale with a range selector and then press submit. 


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

- The home page displays the latest Overnight or Sleepiness as an Ionic card with a "View All" button that brings up a modal that displays all the logs in the order they were logged. 
- We chose to log the data together as the simplcity of one button allowing the user to view every log seem more suitable for mobile apps. 


11. Which feature choose--using a native device resource, backing up logged data, or both?

- Backing up logged data


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

- N/A


13. If you backed up logged data, where does it back up to?

- We used Ioninc Storage which is a hybrid storage method that changes its storage engine based on the device running. During our demo and implementation, Ionic Storage stored the logs in a IndexedDB through the browser. 


14. How does your app implement or follow principles of good mobile design?

- The app has an intuitive initial view that focuses on simplcity. All the features of the app are accessbility with one click from the home page. 
- The user can back out of logging data through the cancel button.
- The Overnight Sleep log selector prevent invalid log errors by preventing users from selecting a wake up time that is before the sleep time.
- A green pop up appears when logs are submitted to provide the user a visual confirmation. 
