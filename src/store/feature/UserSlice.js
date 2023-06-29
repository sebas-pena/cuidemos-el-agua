'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: null,
  email: '',
  phone: '',
  phoneVerified: false,
  emailVerified: false,
  id: '',
  role: '',
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, phone, phoneVerified, emailVerified, id, role } = action.payload
      state.loggedIn = true
      state.email = email
      state.phone = phone
      state.phoneVerified = phoneVerified
      state.emailVerified = emailVerified
      state.id = id
      state.role = role
    },
    logout: () => {
      return {
        loggedIn: false,
        email: '',
        phone: '',
        phoneVerified: false,
        emailVerified: false,
        id: '',
        role: '',
      }
    }
  },

})

export const {
  login,
  logout
} = user.actions
export default user.reducer