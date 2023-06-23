import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import { getContact } from '../api/getContact';
import { ListContactProps, getContactResponse } from '../types/ListContactProps';
import DataTable from '../components/table';

import '../App.css';

const ListContact = () => {
  const [list, setList] = useState<ListContactProps[]>([]);

  const callGetContact = async () => {
    const response = await getContact() as getContactResponse;
    setList(response.data.slice(0, 10));
  }

  useEffect(() => {
    callGetContact();
  }, [])

  return (
    <div className="App">
      {/* dibuat pagination client side */}
      <DataTable list={list} />
      {/* penentuan count pagination perlu diset lagi */}
      <Pagination count={list.length / 10} color="primary" sx={{ marginY: 5 }} />
    </div>
  )
}

export default ListContact;