'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggin: (state) => {
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
    }
  },

})

export const {
  loggin,
  logout
} = user.actions
export default user.reducer