import axios from "axios";

import { URL_API } from "../constants";

const putContact = async (param: any, id: string) => {
  const url = `${URL_API}/contact/${id}`;

  try {
    return await axios.put(url, param);
  } catch (error) {
    return error;
  }
};

export default putContact