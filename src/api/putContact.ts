import { METHOD, URL_API } from "../constants";

const putContact = (body: any) => {
  const url = `${URL_API}/contact`;
  const options = {
    method: METHOD.PUT,
    body
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);// bikin modal
    });
};

export default putContact