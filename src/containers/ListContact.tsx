import { useEffect, useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';

import { getContact } from '../api/getContact';
import { ListContactProps, getContactResponse } from '../types/ListContactProps';
import DataTable from '../components/table';

import '../App.css';

const ListContact = () => {
  const [list, setList] = useState<ListContactProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const callGetContact = async () => {
    await setIsLoading(true);
    const response = await getContact() as getContactResponse;
    await setList(response.data.slice(0, 10));
    await setIsLoading(false);
  }

  useEffect(() => {
    callGetContact();
  }, [])

  return (
    <div className="App">
      {isLoading && <CircularProgress />}
      {!isLoading && <>
        <DataTable list={list} />
        <Pagination count={list.length / 10} color="primary" sx={{ marginY: 5 }} />
      </>
      }
    </div>
  )
}

export default ListContact;