'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCrosshair: false,
  center: {
    lat: 0,
    lng: 0
  },
  lock: false,
  showCrosshairText: false
}

export const map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    showCrosshair: (state) => {
      state.showCrosshair = true
      state.showCrosshairText = true
    },
    hideCrosshairText: (state) => {
      state.showCrosshairText = false
    },
    hideCrosshair: (state) => {
      state.showCrosshair = false
    },
    setCenter: (state, action) => {
      state.center = action.payload
    },
    lock: (state) => {
      state.lock = true
    },
    unlock: (state) => {
      state.lock = false
    }
  },
})

export const {
  showCrosshair,
  hideCrosshair,
  setCenter,
  lock,
  unlock,
  hideCrosshairText
} = map.actions
export default map.reducer