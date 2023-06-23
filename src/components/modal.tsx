import { useState } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

import { styleModal } from './style';

export default function KeepMountedModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" textAlign='center'>
            Confirmation
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }} textAlign='center'>
            Are you sure to make changes to this data?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}>
            <Button variant="contained" type="submit" sx={{ width: '100px' }}>Yes</Button>
            <Button variant="contained" type="button" color="error" sx={{ width: '100px' }} onClick={handleClose}>No</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
