import axios from "axios";

import { URL_API } from "../constants";

const deleteContact = async (id: string) => {
  const url = `${URL_API}/contact/${id}`;

  try {
    return await axios.delete(url);
  } catch (error) {
    return error;
  }
};

export default deleteContact