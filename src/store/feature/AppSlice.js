'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showReport: false,
  report: null,
  totalReports: 0
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
    setTotalReports: (state, action) => {
      state.totalReports = action.payload
    },
    increaseTotalReports: (state) => {
      state.totalReports++
    }
  },

})

export const {
  showReport,
  hideReport,
  setTotalReports,
  increaseTotalReports
} = app.actions
export default app.reducer