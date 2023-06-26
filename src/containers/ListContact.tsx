/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Pagination } from '@mui/material';

import { getContact } from '../api/getContact';
import { ListContactProps } from '../types/ListContactProps';
import DataTable from '../components/table';
import { RootState } from '../store';
// import '../App.css';

const PAGE_SIZE = 10;

const ListContact = () => {
  const isLoading = useSelector((state: RootState) => state.common.showLoader);

  const [list, setList] = useState<ListContactProps[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);

  const handleChange = async (_event: React.ChangeEvent<unknown>, value: number) => {
    await setPage(value);
  };

  const callGetContact = async (pageNo: number) => {
    const response = await getContact() as any;
    await setList(response?.data?.data.slice(pageNo * PAGE_SIZE - PAGE_SIZE, page * PAGE_SIZE) ?? []);
    await setTotalData(response?.data?.data.length);
  }

  useEffect(() => {
    callGetContact(page);
  }, [page]);

  const setTotalPage = () => {
    return totalData % PAGE_SIZE > 0 ? Math.ceil(totalData / PAGE_SIZE) : totalData / PAGE_SIZE;
  }

  return (
    <div className="App">
      {isLoading && <CircularProgress />}
      {!isLoading && <>
        <DataTable list={list} startNo={page * PAGE_SIZE - PAGE_SIZE} />
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Pagination count={setTotalPage()} color="primary" sx={{ marginY: 5 }} onChange={handleChange} page={page} />
        </Box>
      </>
      }
    </div>
  )
}

export default ListContact;