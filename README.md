# CycleLicense Mock Test
- You can also follow [Ionic](https://ionicframework.com/) Website to setup environment
- Source: https://drive.google.com/drive/folders/1GUUKQv9yciQUmfEv_qAPgvNbHjUST--p

## Environment Setting:

- Install [node.js](https://nodejs.org/en/download/)
- Verify the installation:
  ```
  node --version
  npm --version
  ```
- Install the Ionic CLI with npm:
  ```
  npm i -g @ionic/cli
  ```
- Go to project root directory and install packages:
  ```
  npm install
  ```
- Run th App:
  ```
  ionic serve
  ```

## Deployment for iOS:

- Install Xcode from App Store
- Go to project root directory and follow the steps
- Adding the iOS Platform:
  ```
  npm install @capacitor/ios
  ```
- Then, add the iOS platform:
  ```
  npx cap add ios
  ```
- Run the build command with the --prod flag:
  ```
  ionic build --prod
  ```
- Sync and Copy:
  ```
  npx cap sync ios && npx cap copy ios
  ```
- Open the project in ```./ios/``` to start Xcode:
  ```
  npx cap open ios
  ```

## Deployment for Android:

- Install [Android Studio](https://developer.android.com/studio)
- Go to project root directory and follow the steps
- Adding the android Platform:
  ```
  npm install @capacitor/android
  ```
- Then, add the iOS platform:
  ```
  npx cap add android
  ```
- Run the build command with the --prod flag:
  ```
  ionic build --prod
  ```
- Sync and Copy:
  ```
  npx cap copy && npx cap sync
  ```
- Open the project in ```./ios/``` to start Xcode:
  ```
  npx cap open android
  ```
  
### Remark:
- If encounter 'permission denied' when running script, please use "sudo" to install
- And also give full permission to the project directory:
  ```
  chmod -R 777 PROJECT_DIR
  ```

### Admob:
- For android:
  - https://developers.google.com/admob/android/quick-start
  - https://developers.google.com/admob/android/test-ads#enable_test_devices
- For iOS (currently can only show ads under capacitor & admob <= 5.0.0):
  - https://developers.google.com/admob/ios/quick-start
  - https://developers.google.com/admob/ios/test-ads#enable_test_devices

 **Remark** 
 For adding app-ads.txt, please refer here:
 https://www.app-ads-txt.com/
 https://developers.google.com/admob/android/app-ads

### Local Notification (version 5):
 - https://capacitorjs.com/docs/v5/apis/local-notifications
