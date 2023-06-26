'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: null,
  email: '',
  phone: '',
  phoneVerified: false,
  emailVerified: false,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, phone, phoneVerified, emailVerified } = action.payload
      state.loggedIn = true
      state.email = email
      state.phone = phone
      state.phoneVerified = phoneVerified
      state.emailVerified = emailVerified
    },
    logout: () => {
      return {
        loggedIn: false,
        email: '',
        phone: '',
        phoneVerified: false,
        emailVerified: false,
      }
    }
  },

})

export const {
  login,
  logout
} = user.actions
export default user.reducer