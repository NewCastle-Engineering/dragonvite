import { Container, Box, AppBar, Toolbar, Typography } from '@mui/material'
import HomePage from '@pages/HomePage'

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dragonvite
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container maxWidth="lg">
          <HomePage />
        </Container>
      </Box>
    </>
  )
}
