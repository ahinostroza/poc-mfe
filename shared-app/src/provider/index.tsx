import React from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from '../store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(reduxStore)

const ProviderStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

export default ProviderStore