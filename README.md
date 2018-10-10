# Geo

A simple app created in React Native for storing and visualizing movements between coordinates.

## Requisites

[NodeJS](https://nodejs.org/en/)
[Yarn](https://yarnpkg.com/es-ES/docs/install)
[Android Studio](https://developer.android.com/studio/)

## How to use in dev environment

Simply clone this repo in a directory easily accesible, then you must access the directory in the terminal and type:
```
npm install
```
This will install all the dependencies of the project.Then you can just open the "android" folder inside it on Android Studio and let Gradle do the syncing process.

When the process finishes you can hit the play button to run the app inside a virtual device or a physical device (for this, you must have the **__debug option enabled__** in the Developer options menu inside settings and the device must be connected through USB to the PC), for either of the options, you must go to to the cloned repo before and type in the terminal:
```
react-native start
```
Now, in the app (either virtually or physically), there must appear an error about the bundle. That can be fixed by shaking the device (if on physical) and selecting **__Dev Settings__** and going to the **__Debug server host & port for device__**. There you must write the IP of the PC where you started the server (which is the **__start__** command you did put in the terminal) followed by the port (usually 8081).
```
Example:
192.168.1.82:8081
```
Then the app shall load without error. The same goes if you're virtually.

If after all this the screen goes blank, then disconnect the USB and restart the app.