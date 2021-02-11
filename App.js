import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { Provider } from 'react-redux'

import store from './src/utils/redux/store'



import Router from './src/route'


const appRouter = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  )
}

export default appRouter;
