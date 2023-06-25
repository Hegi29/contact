import { Avatar, Box, Button, Modal, Stack, Typography } from '@mui/material';

import { styleModal } from './style';

export type NonPhotoProps = { message: string, handleYes: () => void, handleClose: () => void }
export type ModalProps = { message: string, open: boolean, handleClose: () => void, handleYes: () => void, srcPhoto?: string, modalType?: string }
export type PhotoProps = { srcPhoto: string };

const NonPhoto = ({ message, handleYes, handleClose }: any) => {
  return (
    <>
      <Typography id="modal-title" variant="h6" component="h2" textAlign='center'>
        Confirmation
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }} textAlign='center'>
        {message}
        {/* // Are you sure to make changes to this data? */}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={5}>
        <Button variant="contained" type="submit" sx={{ width: '100px' }} onClick={handleYes}>Yes</Button>
        <Button variant="contained" type="button" color="error" sx={{ width: '100px' }} onClick={handleClose}>No</Button>
        {/* <Button variant="contained" type="submit" sx={{ width: '100px' }} onClick={handleOK}>OK</Button> */}
      </Stack>
    </>
  )
}

const Photo = ({ srcPhoto }: PhotoProps) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Avatar src={srcPhoto} alt='photo preview' sx={{ width: 200, height: 200 }} variant="square" />
    </Box>
  )
}

export default function KeepMountedModal({ message, open, handleClose, handleYes, srcPhoto, modalType }: ModalProps) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styleModal}>
        {modalType !== 'photo' && <NonPhoto message={message} handleYes={handleYes} handleClose={handleClose} />}
        {modalType === 'photo' && <Photo srcPhoto={srcPhoto} />}
      </Box>
    </Modal>
  );
}
