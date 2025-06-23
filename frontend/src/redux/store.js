//config the store to store the states globally
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import jobSlice from "./jobSlice.js"
import companieSlice from "./companySlice.js"
import applicationSlice from "./applicationSlice.js"


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

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    companie: companieSlice,
    application: applicationSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export default store;