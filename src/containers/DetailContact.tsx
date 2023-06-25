/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Stack, Button, Box, TextField, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { ListContactProps } from '../types/ListContactProps';
import { getContactByID } from '../api/getContact';
import KeepMountedModal from '../components/modal';
import ListContactHeader from './ListContactHeader';
import schema from '../schemas/contact';
import putContact from '../api/putContact';

const DetailContact = () => {
  const navigate = useNavigate();
  const { state: { id } } = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const [, setData] = useState<ListContactProps>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callGetContactDetail = async () => {
    await setIsLoading(true);
    const response = await getContactByID(id) as any;
    setValue('firstName', response.data.firstName);
    setValue('lastName', response.data.lastName);
    setValue('age', response.data.age);
    setPhoto(response.data.photo);
    await setData(response.data);
    await setIsLoading(false);
  }

  useEffect(() => {
    callGetContactDetail();
  }, [])

  const onSubmit: SubmitHandler<any> = async (data) => {
    await setMessage('Are You Sure To Save?');
    await handleOpen();
  }

  const handleYes = async () => {
    if (message === 'Are You Sure?') {
      navigate('/');
      return;
    }

    await setIsLoading(true);
    const response = await putContact(null);// ganti ke obj
    if (response.message) {
      await setMessage('Successully Updated, this message will disappear in 2 seconds');
      setTimeout(async () => {
        await handleClose();
        await setIsLoading(false);
        navigate('/');
      }, 2000)
    }

    await setIsLoading(false);
  }

  const handleCancel = async () => {
    await setMessage('Are You Sure?');
    await handleOpen();
  }

  const handleSetPhoto = (e: any) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPhoto(objectUrl);
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
            <input type="file" id="photo" placeholder="Photo" {...register("photo")} onChange={(e: any) => handleSetPhoto(e)} />
            <Typography variant="caption" display="block" gutterBottom color='error'>
              {errors?.photo?.message as any}
            </Typography>
            {photo && <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                objectFit: 'contain',
                backgroundColor: '#636363'
              }}
              src={photo}
              alt='Preview'
            />}
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