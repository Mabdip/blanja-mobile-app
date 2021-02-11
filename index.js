/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
//PUSH NOTIF
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN: ', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  // requestPermissions: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
