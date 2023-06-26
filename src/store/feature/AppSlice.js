'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showReport: false,
  report: null,
  showLoginModal: false,
}

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showReport: (state, action) => {
      state.showReport = true
      state.report = action.payload
    },
    hideReport: (state) => {
      state.showReport = false
      state.report = null
    },
    showLoginModal: (state) => {
      state.showLoginModal = true
    },
    hideLoginModal: (state) => {
      state.showLoginModal = false
    }
  },

})

export const {
  showReport,
  hideReport,
  showLoginModal,
  hideLoginModal
} = app.actions
export default app.reducer