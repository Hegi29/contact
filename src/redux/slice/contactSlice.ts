import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {
    contactAdded(state: any, action) {
      state.push({
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        photo: action.payload.photo,
        age: action.payload.age
      })
    },
    // contactToggled(state, action) {
    //   const todo = state.find((todo: any) => todo.id === action.payload) as any
    //   todo.completed = !todo.completed
    // }
  }
})

export const { contactAdded } = contactSlice.actions
export default contactSlice.reducer