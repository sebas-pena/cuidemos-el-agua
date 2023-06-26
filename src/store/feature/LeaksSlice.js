'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalLeaksCounter: null,
  solvedLeaksCounter: null,
  leaks: [],
  solvedLeaks: []
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
    }
  },

})

export const {
  setTotalLeaksCounter,
  setSolvedLeaksCounter,
  setSolvedLeaks,
  setLeaks,
  increaseTotalLeaksCounter,
  addLeak
} = leaks.actions
export default leaks.reducer