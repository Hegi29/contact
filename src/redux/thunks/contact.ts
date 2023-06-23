import { contactAdded } from "../slice/contactSlice";

export const fetchContactById = (id: string) => async (dispatch: (arg0: any) => void) => {
  const response = null; //await client.get(`/fakeApi/todo/${todoId}`)
  dispatch(contactAdded(response))
}