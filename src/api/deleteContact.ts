import { URL_API, METHOD } from "../constants";

const deleteContact = (id: string) => {
  const url = `${URL_API}/contact/${id}`;
  const options = {
    method: METHOD.DELETE
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

export default deleteContact