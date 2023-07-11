import { Avatar, Box, Button, Modal, Stack, Typography } from '@mui/material';

import { ModalProps, NonPhotoProps, PhotoProps } from '../types/Modal';
import { styleModal } from './style';

const NonPhoto = ({ title, message, handleYes, handleClose }: NonPhotoProps) => {
  return (
    <>
      <Typography id="modal-title" variant="h6" component="h2" textAlign='center'>
        <strong>{title}</strong>
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }} textAlign='center'>
        {message}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={5}>
        {title === 'Confirmation' && <>
          <Button variant="contained" type="submit" sx={{ width: '100px' }} onClick={handleYes}>Yes</Button>
          <Button variant="contained" type="button" color="error" sx={{ width: '100px' }} onClick={handleClose}>No</Button>
        </>}
        {title !== 'Confirmation' && <>
          <Button variant="contained" type="submit" sx={{ width: '100px' }} onClick={handleClose}>OK</Button>
        </>}
      </Stack>
    </>
  )
}

const Photo = ({ srcPhoto, initName }: PhotoProps) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Avatar src={srcPhoto} alt={initName} sx={{ width: 200, height: 200 }} variant="square" />
    </Box>
  )
}

export default function KeepMountedModal({ title, message, open, handleClose, handleYes, srcPhoto, modalType, initName }: ModalProps) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styleModal}>
        {modalType !== 'photo' && <NonPhoto title={title} message={message} handleYes={handleYes} handleClose={handleClose} />}
        {modalType === 'photo' && <Photo srcPhoto={srcPhoto ?? ''} initName={initName} />}
      </Box>
    </Modal>
  );
}
