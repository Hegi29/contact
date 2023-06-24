import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material"

const ListContactHeader = ({ title, showButton = false }: any) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} my={5}>
      <Grid item>
        <Typography variant="h6">
          <strong>{title || `CONTACT APPS`}</strong>
        </Typography>
      </Grid>
      {showButton &&
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2} />
          <Grid item>
            <Button variant="contained" type="submit" onClick={() => navigate('/add')}>Add New Contact</Button>
          </Grid>
        </Grid>
      }
    </Grid>
  )
}

export default ListContactHeader