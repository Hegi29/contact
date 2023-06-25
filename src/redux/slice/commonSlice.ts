import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  showModal: boolean,
  showLoader: boolean
}

const initialState: CommonState = {
  showModal: false,
  showLoader: false
}

export const counterSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.showLoader = action.payload
    }
  },
})

export const { toggleModal, toggleLoader } = counterSlice.actions

export default counterSlice.reducer