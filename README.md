# SpotSeeker Travel Application

SpotSeeker is an App made with React Native  that connects users with a passion for travel, sharing their experiences through photos, and comments, viewing an interactive map of places and preserving memories of their best adventures.

This repository contains the client-side code for SpotSeeker's mobile application. The corresponding server-side code is located at [SpotSeeker Api](https://github.com/spotseeker/api.git).

This app is built using React Native and can be compiled for either iOS or Android.

**Prototype Design:** 
You can access the full version of the prototype made in Figma by clicking: [SporSeeker App](https://www.figma.com/design/phDfVhcOGZF5cRhwb0knjp/SpotSeeker?node-id=0-1&t=ummGEIegPCRMhv3e-1)


**Pre requisites**

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- The local backend is running, and local db is   populated with user test account.


**Get started** 
1. First, make sure you have Expo CLI installed:

```bash
npm install -g expo-cli
```

2. Clone the repository

```bash
git clone https://github.com/spotseeker/app.git
cd app
```
3. Open a terminal in the frontend project, and install dependencies 

 ```bash
    npm install
   ```
4. Start the app

 ```bash
    npx expo start
   ```

5. **Expo Go**

After running these commands a new window in your browser will open up with information about the project.

To preview the project you need to download Expo Client App on your smartphone. Depending on the phone you have you can do this on the App Store, on the Google Play Store or here.

Once you have the Expo Client App installed scan the QR Code that you saw when you ran npm start on the terminal. You will have to wait a couple of minutes at first while project bundles and loads for the first time.

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.




 **Made With:** 
 --------------
![Static Badge](https://img.shields.io/badge/React%20Native-61DBFB?logo=react&labelColor=black) ![Static Badge](https://img.shields.io/badge/NativeWind-61DBFB?logo=tailwindcss&labelColor=black) ![Static Badge](https://img.shields.io/badge/Expo-000020?logo=Expo&labelColor=black) ![Static Badge](https://img.shields.io/badge/Typescript-007acc?logo=typescript&labelColor=black)

Creating APK
-----------------
A tutorial for building an APK can be found here: https://reactnative.dev/docs/signed-apk-android. You can also build the APK in Android Studio by adding Run/Debug configurations in your Android Studio project. Select the gradle project in the configuration (~/android) and the Gradle task ‘assembleRelease’.