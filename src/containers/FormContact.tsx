import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button, Box, TextField, Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../schemas/contact';

const FormContact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log('errors: ', errors);
  }, [errors])

  const [photo, setPhoto] = useState('');

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('submit: ', data);
    reset();
  }

  const handleCancel = () => {
    // kasih modal jika yakin cancel baru navigate
    navigate('/')
  }

  const handleSetPhoto = (e: any) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPhoto(objectUrl);
  }

  return (
    <Box
      sx={{
        width: '50%',
        height: 300,
        m: '0 auto',
        mt: 10
        // backgroundColor: 'primary.dark',
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </Box>
  )
}

export default FormContact