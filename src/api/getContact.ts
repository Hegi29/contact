import axiosInstance from "axios";

import { URL_API } from "../constants";

export const getContact = async () => {
  const url = `${URL_API}/contact`;

  try {
    return await axiosInstance.get(url);
  } catch (error) {
    return error;
  }
};

export const getContactByID = async (id: string) => {
  const url = `${URL_API}/contact/${id}`;

  try {
    return await axiosInstance.get(url);
  } catch (error) {
    return error;
  }
};
