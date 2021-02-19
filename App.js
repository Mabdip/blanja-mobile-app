import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { Provider } from 'react-redux'

//persist
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import store from './src/utils/redux/store'
import Router from './src/route'

const persistedStore = persistStore(store)

const appRouter = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default appRouter;
