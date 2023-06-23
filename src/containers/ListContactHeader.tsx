import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"

const ListContactHeader = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" type="submit" sx={{ mr: 2 }} onClick={() => navigate('/add')}>Add New Contact</Button>
  )
}

export default ListContactHeader