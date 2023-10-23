>🚧🚧 **Note**: This React Native application has been developed on a windows PC. Therefore, I have not been able to configure and optimize it for IOS devices. Please test it with a **Android Emulator** with the Android API 33 (Android 13). 

# Introduction

This is a simple chat application where you can chat in different rooms. 

I was given this task to prove my skills in React Native.

### The requirements

| Requirement | Status | Comment |
| --- | --- | --- |
| Splash screen | 🟩 | |
| Login screen | 🟩 | |
| Chat rooms | 🟩 | |
| Send and receive messages | 🟩 | |
| Push functionality | 🟨 | Added listening for notifications and permissions alert. (Backend needed for sendning notifications). |
| Upload of images to chat room | 🟥 | Not met. |

### Dependecies
- [@react-navigation](https://www.npmjs.com/package/@react-navigation/native)
- [@react-native-firebase](https://www.npmjs.com/package/@react-native-firebase/app)
- [@react-native-google-signin](https://www.npmjs.com/package/@react-native-google-signin/google-signin)
- [react-native-fbsdk-next](https://www.npmjs.com/package/react-native-fbsdk-next)
- [react-native-gifted-chat](https://www.npmjs.com/package/react-native-gifted-chat)
- [react-native-screens](https://www.npmjs.com/package/react-native-screens)
- [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen)
- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)

# Getting started

Folow these steps to get the chat application up and running.

## Step 1: Clone the repository

First, you will need to clone the repository.

After that you will need to install the needed dependecies for the application:

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start the Metro Server

After that, you will need to start the **Metro** server.

To start Metro, run the following command from the _root_ of the project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of the project. Run the following command to start the _Android_ application:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see the chat application running in your _Android Emulator_ shortly provided you have set up your emulator/simulator correctly.
