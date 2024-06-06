import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi, meterReadingsApi } from './apis'
import { userSlice } from './slices'

import { STORE_KEYS } from './storeKeys'

const rootReducer = combineReducers({
  [STORE_KEYS.AUTH_API]: authApi.reducer,
  [STORE_KEYS.METER_READINGS_API]: meterReadingsApi.reducer,
  [STORE_KEYS.USER]: userSlice.reducer,
})

const persistConfig = {
  key: STORE_KEYS.ROOT,
  storage,
  whitelist: [STORE_KEYS.USER],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(meterReadingsApi.middleware)

    return defaultMiddleware
  },
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
