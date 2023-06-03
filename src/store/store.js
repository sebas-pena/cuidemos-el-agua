'use client'
import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './feature/MapSlice'
export const store = configureStore({
  reducer: {
    map: mapReducer
  },
})