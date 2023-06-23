import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit as EditIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';

import { StyledTableCell, StyledTableRow } from './style';

export default function BasicTable({ list }: any) {
  const navigate = useNavigate();

  const handleDetail = (id: string) => {
    navigate('/detail', { state: { id } });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="list contact table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="center">Photo</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Nme</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row: any, index: number) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                <Avatar src={row.photo} alt={row.firstName} sx={{ width: 56, height: 56 }} />
              </StyledTableCell>
              <StyledTableCell align="center">{row.firstName}</StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.age}</StyledTableCell>
              <StyledTableCell align="center">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="primary" onClick={() => handleDetail(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}