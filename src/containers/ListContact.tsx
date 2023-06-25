/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Pagination } from '@mui/material';

import { getContact } from '../api/getContact';
import { ListContactProps, getContactResponse } from '../types/ListContactProps';
import DataTable from '../components/table';
import { toggleLoader } from '../redux/slice/commonSlice';
import { RootState } from '../store';
import '../App.css';

const ListContact = () => {
  const isLoading = useSelector((state: RootState) => state.common.showLoader)
  const dispatch = useDispatch()

  const [list, setList] = useState<ListContactProps[]>([]);

  const callGetContact = async () => {
    dispatch(toggleLoader(true));
    const response = await getContact() as any;
    await setList(response?.data?.data ?? []); // .slice(0, 10));
    dispatch(toggleLoader(false));
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