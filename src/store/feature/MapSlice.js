'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCrosshair: false,
  center: {
    lat: 0,
    lng: 0
  },
  lock: false,
  showCrosshairText: false,
  showDescriptionInput: false,
  showFileInput: false,
  description: '',
  markers: []
}

export const map = createSlice({
  name: 'map',
  initialState,
  reducers: {
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
    },
    cancelReport: (state) => {
      state.showCrosshair = false
      state.center = {
        lat: 0,
        lng: 0
      }
      state.lock = false
      state.showCrosshairText = false
      state.showDescriptionInput = false
      state.showFileInput = false
    },
    startReport: (state) => {
      state.showCrosshair = true
      state.showCrosshairText = true
    },
    confirmLocation: (state) => {
      state.showDescriptionInput = true
      state.lock = true
      state.showCrosshairText = false
    },
    confirmDescription: (state, action) => {
      state.showFileInput = true
      state.showDescriptionInput = false
      state.description = action.payload
    },
    sendReport: (state) => {
      state.showCrosshair = false
      state.center = {
        lat: 0,
        lng: 0
      }
      state.lock = false
      state.showCrosshairText = false
      state.showDescriptionInput = false
      state.showFileInput = false
      state.description = ''
    },
    setMarkers: (state, action) => {
      state.markers = action.payload
    },
    addMarker: (state, action) => {
      state.markers.push(action.payload)
    },
    removeMarker: (state, action) => {
      state.markers = state.markers.filter((marker) => marker.id !== action.payload)
    }
  },
})

export const {
  showCrosshair,
  hideCrosshair,
  setCenter,
  lock,
  unlock,
  hideCrosshairText,
  cancelReport,
  startReport,
  confirmLocation,
  confirmDescription,
  sendReport,
  setMarkers,
  addMarker,
  removeMarker
} = map.actions
export default map.reducer