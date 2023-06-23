import { URL_API } from "../constants";

export const getContact = () => {
  const url = `${URL_API}/contact`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);// bikin modal
    });
};

export const getContactByID = (id: string) => {
  const url = `${URL_API}/contact/${id}`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);// bikin modal
    });
};
