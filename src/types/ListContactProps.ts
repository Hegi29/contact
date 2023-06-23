export type ListContactProps = {
  photo: string,
  firstName: string,
  lastName: string,
  age: number
}

export interface getContactResponse { mesage: string, data: ListContactProps[] }
