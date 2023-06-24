import { Container } from "@mui/material"

import ListContact from "./ListContact"
import ListContactHeader from "./ListContactHeader"
import Footer from "./Footer"

const ContactWrapper = () => {
  return (
    <Container sx={{ px: 3 }}>
      <ListContactHeader showButton />
      <ListContact />
      <Footer />
    </Container>
  )
}

export default ContactWrapper