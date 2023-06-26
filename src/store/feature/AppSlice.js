'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showReport: false,
  report: null,
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
    },
  },

})

export const {
  showReport,
  hideReport,
} = app.actions
export default app.reducer