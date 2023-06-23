import { useNavigate } from "react-router-dom"
import { Button, Grid } from "@mui/material"

import ListContact from "./ListContact"

const ContactWrapper = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} my={5}>
        <Grid item></Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}></Grid>
          <Grid item>
            <Button variant="contained" type="submit" sx={{ mr: 2 }} onClick={() => navigate('/add')}>Add New Contact</Button>
          </Grid>
        </Grid>
      </Grid>
      <ListContact />
    </>
  )
}

export default ContactWrapper