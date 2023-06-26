import { HttpStatusCode } from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button, Box, TextField, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../schemas/contact';
import KeepMountedModal from '../components/modal';
import ListContactHeader from './ListContactHeader';
import postContact from '../api/postContact';
import { toggleLoader } from '../redux/slice/commonSlice';
import { RootState } from '../store';

const FormContact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const isLoading = useSelector((state: RootState) => state.common.showLoader)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<any> = async () => {
    await setTitle('Confirmation');
    await setMessage('Are you sure to save this changes?');
    await handleOpen();
  }

  const handleYes = async () => {
    if (message === 'Are you sure?') {
      navigate('/');
      return;
    }

    const values = getValues();
    dispatch(toggleLoader(true));

    const response = await postContact(values) as any;
    if (response?.status === HttpStatusCode.Created) {
      await setTitle('Info');
      await setMessage('Successully added, this message will disappear in 2 seconds');
      setTimeout(async () => {
        await handleClose();
        dispatch(toggleLoader(false));
        navigate('/');
      }, 2000)
      return;
    }

    await handleClose();
    await setTitle('Error');
    await setMessage(response.message);
    await handleOpen();
    dispatch(toggleLoader(false));
  }

  const handleCancel = async () => {
    await setTitle('Confirmation');
    await setMessage('Are you sure?');
    await handleOpen();
  }

  return (
    <>
      <KeepMountedModal title={title} message={message} open={open} handleClose={handleClose} handleYes={handleYes} />
      <Box
        sx={{
          width: '50%',
          height: 300,
          m: '0 auto',
          mt: 10
        }}
      >
        <ListContactHeader title="Add New Contact" />
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
            <TextField id="photo" label="URL Photo" variant="outlined" {...register("photo")} />
            <Typography variant="caption" display="block" gutterBottom color='error'>
              {errors?.photo?.message as any}
            </Typography>
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

export default FormContact