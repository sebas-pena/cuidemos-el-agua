'use client'
import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './feature/MapSlice'
import appReducer from './feature/AppSlice'
import userReducer from './feature/UserSlice'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    app: appReducer,
    user: userReducer,
  },
})