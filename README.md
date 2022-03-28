# sample-react-native-firebase
A sample app built with React Native, TypeScript and Firebase Resources: Authentication and Firestore Database.

![Demo Video](demo_video.gif)

The android/app/google-services.json has its values ​​omitted for the security of my Firebase account.

## Running Locally

Before the steps below, create a Firebase project, download the google-services.json file and replace my project's android/app/google-services.json with the file you downloaded.


Then, connect your cell phone to your computer or open an Android emulator.

```sh
#If you choose to run the app on your mobile, make sure it connected correctly
adb devices -l

#Install dependencies
yarn install

# start the metro server
react-native start
```

Leave the metro server in a separate tab and open a new tab.

```sh
react-native run-android
```
