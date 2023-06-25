import axios from "axios";

import { URL_API } from "../constants";

const postContact = async (param: any) => {
  const url = `${URL_API}/contact`;

  try {
    return await axios.post(url, param);
  } catch (error) {
    return error;
  }
};

export default postContact