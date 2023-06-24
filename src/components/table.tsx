import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { Edit as EditIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';

import { StyledTableCell, StyledTableRow } from './style';
import KeepMountedModal from './modal';

export default function BasicTable({ list }: any) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [, setIDDelete] = useState('');
  const [srcPhoto, setSrcPhoto] = useState('');
  const [modalType, setModalType] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (id: string) => {
    navigate('/edit', { state: { id } });
  }

  const handleDelete = async (id: string, name: string) => {
    await setIDDelete(id);
    await setMessage(`Are You Sure to Delete ${name}?`);
    await handleOpen();
  }

  const handleYes = async () => {
    await setMessage('Successully Deleted, this message will disappear in 2 seconds');
    setTimeout(async () => {
      // disini panggil api delete
      await handleClose();
      // reload data
    }, 2000)
  }

  const handlePreviewPhoto = async (src: string) => {
    await setModalType('photo');
    await setSrcPhoto(src);
    await handleOpen();
  }

  return (
    <>
      <KeepMountedModal message={message} open={open} handleClose={handleClose} handleYes={handleYes} srcPhoto={srcPhoto} modalType={modalType} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="list contact table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"><strong>No</strong></StyledTableCell>
              <StyledTableCell align="center"><strong>Photo</strong></StyledTableCell>
              <StyledTableCell align="center"><strong>First Name</strong></StyledTableCell>
              <StyledTableCell align="center"><strong>Last Name</strong></StyledTableCell>
              <StyledTableCell align="center"><strong>Age</strong></StyledTableCell>
              <StyledTableCell align="center"><strong>Action</strong></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row: any, index: number) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center" sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: 'pointer'
                }}>
                  <Tooltip title='Click to preview'>
                    <Avatar src={row.photo} alt={row.firstName} sx={{ width: 56, height: 56 }} onClick={() => handlePreviewPhoto(row.photo)} />
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="center">{row.firstName}</StyledTableCell>
                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                <StyledTableCell align="center">{row.age}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Tooltip title={`Edit ${row.firstName}`}>
                      <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`Delete ${row.firstName}`}>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id, row.firstName)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}