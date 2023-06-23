/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack, Button, Box, TextField } from '@mui/material';

import { ListContactProps } from '../types/ListContactProps';
import { getContactByID } from '../api/getContact';
import KeepMountedModal from '../components/modal';

const DetailContact = () => {
  const navigate = useNavigate();
  const { state: { id } } = useLocation();

  console.log('id :', id);

  const [data, setData] = useState<ListContactProps>();

  const callGetContactDetail = async () => {
    const response = await getContactByID(id) as any;
    setData(response.data);
  }

  useEffect(() => {
    callGetContactDetail();
  }, [])

  const handleCancel = () => {
    // kasih modal jika yakin cancel baru navigate
    navigate('/')
  }

  return (
    <Box
      sx={{
        width: '50%',
        height: 300,
        m: '0 auto',
        mt: 10,
        mb: 35
      }}
    >
      <Stack spacing={2}>
        <TextField id="first-name" label="" variant="outlined" value={data?.firstName} />
        <TextField id="last-name" label="" variant="outlined" value={data?.lastName} />
        <TextField id="age" label="" variant="outlined" value={data?.age} />
        <input type="file" name="Photo" id="photo" placeholder="Photo" />
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            objectFit: 'contain',
            backgroundColor: '#636363'
          }}
          src={data?.photo}
          alt={data?.firstName}
        />
        <KeepMountedModal />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit" sx={{ width: '100px' }}>Save</Button>
          <Button variant="contained" type="button" color="error" sx={{ width: '100px' }} onClick={handleCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default DetailContact