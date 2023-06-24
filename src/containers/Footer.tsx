import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      flexGrow: 1,
      justifyContent: "center",
      display: "flex",
      mb: 2,
    }}
  >
    <Typography variant="caption" color="initial">
      Hegi Tri Saputra - 2023
    </Typography>
  </Box>
)

export default Footer