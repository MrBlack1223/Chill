import { configureStore } from '@reduxjs/toolkit'
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import UserSlice from './UserSlice'
import socketMiddleware from './socketMiddleware'
import chatSlice from './chatSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, UserSlice)
const persistedReducer2 = persistReducer(persistConfig, chatSlice)
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    chat: persistedReducer2
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socketMiddleware),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch