import { configureStore } from '@reduxjs/toolkit'

import contactReducer from './redux/slice/contactSlice'

export const store = configureStore({
  reducer: {
    contact: contactReducer
  }
})