/* eslint-disable react-hooks/exhaustive-deps */

import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button, Box, TextField, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { ListContactProps } from '../types/ListContactProps';
import { getContactByID } from '../api/getContact';
import KeepMountedModal from '../components/modal';
import ListContactHeader from './ListContactHeader';
import schema from '../schemas/contact';
import putContact from '../api/putContact';
import { RootState } from '../store';
import { toggleLoader } from '../redux/slice/commonSlice';

const DetailContact = () => {
  const navigate = useNavigate();
  const { state: { id } } = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const isLoading = useSelector((state: RootState) => state.common.showLoader)
  const dispatch = useDispatch()

  const [, setData] = useState<ListContactProps>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mappingValue = (response: any) => {
    setValue('firstName', response.data.data.firstName);
    setValue('lastName', response.data.data.lastName);
    setValue('age', response.data.data.age);
    setValue('photo', response.data.data.photo);
  }

  const callGetContactDetail = async () => {
    dispatch(toggleLoader(true));
    const response = await getContactByID(id) as any;
    mappingValue(response);
    await setData(response.data);
    dispatch(toggleLoader(false));
  }

  useEffect(() => {
    callGetContactDetail();
  }, [])

  const onSubmit: SubmitHandler<any> = async () => {
    await setMessage('Are You Sure To Save?');
    await handleOpen();
  }

  const handleYes = async () => {
    if (message === 'Are You Sure?') {
      navigate('/');
      return;
    }

    dispatch(toggleLoader(true));

    const values = getValues();
    const response = await putContact(values, id) as any;
    if (response?.status === HttpStatusCode.Created) {
      await setMessage('Successully Updated, this message will disappear in 2 seconds');
      setTimeout(async () => {
        await handleClose();
        dispatch(toggleLoader(false));
        navigate('/');
      }, 2000)
      return;
    }

    await handleClose();
    alert('Error');// ganti sama modal
    dispatch(toggleLoader(false));
  }

  const handleCancel = async () => {
    await setMessage('Are You Sure?');
    await handleOpen();
  }

  return (
    <>
      <KeepMountedModal message={message} open={open} handleClose={handleClose} handleYes={handleYes} />
      <Box
        sx={{
          width: '50%',
          height: 300,
          m: '0 auto',
          mt: 10
        }}
      >
        <ListContactHeader title="Edit Contact" />
        {isLoading && <CircularProgress />}
        {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField id="first-name" label="First Name" variant="outlined" {...register("firstName")} />
            <Typography variant="caption" display="block" gutterBottom color='error'>
              {errors?.firstName?.message as any}
            </Typography>
            <TextField id="last-name" label="Last Name" variant="outlined" {...register("lastName")} />
            <Typography variant="caption" display="block" gutterBottom color='error'>
              {errors?.lastName?.message as any}
            </Typography>
            <TextField id="age" type="number" label="Age" variant="outlined" {...register("age")} />
            <Typography variant="caption" display="block" gutterBottom color='error'>
              {errors?.age?.message as any}
            </Typography>
            <TextField id="photo" label="Photo" variant="outlined" {...register("photo")} />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" sx={{ width: '100px' }}>Save</Button>
              <Button variant="contained" type="button" color="error" sx={{ width: '100px' }} onClick={handleCancel}>Cancel</Button>
            </Stack>
          </Stack>
        </form>}
      </Box>
    </>
  )
}

export default DetailContact