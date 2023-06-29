'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalLeaksCounter: null,
  solvedLeaksCounter: null,
  leaks: [],
  solvedLeaks: [],
  leakOnDisplay: null,
  showLeak: false
}

export const leaks = createSlice({
  name: 'leaks',
  initialState,
  reducers: {
    setTotalLeaksCounter: (state, action) => {
      state.totalLeaksCounter = action.payload
    },
    setSolvedLeaksCounter: (state, action) => {
      state.solvedLeaksCounter = action.payload
    },
    setSolvedLeaks: (state, action) => {
      state.solvedLeaks = action.payload
    },
    setLeaks: (state, action) => {
      state.leaks = action.payload
    },
    increaseTotalLeaksCounter: (state) => {
      state.totalLeaksCounter++
    },
    addLeak: (state, action) => {
      state.leaks.push(action.payload)
    },
    closeLeak: (state, action) => {
      const leak = state.leaks.find(leak => leak._id === action.payload.id)
      leak.closedAt = action.payload.closedAt
      state.solvedLeaks.push(leak)
      state.leaks = state.leaks.filter(leak => leak._id !== action.payload.id)
      state.solvedLeaksCounter++
      if (state.leakOnDisplay && state.leakOnDisplay._id === action.payload.id) state.leakOnDisplay.closedAt = action.payload.closedAt
    },
    reopenLeak: (state, action) => {
      const leak = state.solvedLeaks.find(leak => leak._id === action.payload)
      leak.closedAt = null
      state.leaks.push(leak)
      state.solvedLeaks = state.solvedLeaks.filter(leak => leak._id !== action.payload)
      state.solvedLeaksCounter--
      if (state.leakOnDisplay && state.leakOnDisplay._id === action.payload) state.leakOnDisplay.closedAt = null
    },
    showLeak: (state, action) => {
      state.showLeak = true
      state.leakOnDisplay = state.leaks.find(leak => leak._id === action.payload) || state.solvedLeaks.find(leak => leak._id === action.payload)
    },
    hideLeak: (state) => {
      state.showLeak = false
      state.leakOnDisplay = null
    },
    deleteLeak: (state, action) => {
      const openLeaksCount = state.leaks.length
      state.leaks = state.leaks.filter(leak => leak._id !== action.payload)
      if (openLeaksCount === state.leaks.length) {
        state.solvedLeaks = state.solvedLeaks.filter(leak => leak._id !== action.payload)
        state.solvedLeaksCounter--
      }
      state.totalLeaksCounter--

      if (state.leakOnDisplay && state.leakOnDisplay._id === action.payload) {
        state.showLeak = false
        state.leakOnDisplay = null
      }
    }
  },

})

export const {
  setTotalLeaksCounter,
  setSolvedLeaksCounter,
  setSolvedLeaks,
  setLeaks,
  increaseTotalLeaksCounter,
  addLeak,
  closeLeak,
  reopenLeak,
  showLeak,
  hideLeak,
  deleteLeak
} = leaks.actions
export default leaks.reducer