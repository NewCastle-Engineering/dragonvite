import { Box, Typography, Button, Stack } from '@mui/material'

export default function HomePage() {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        Welcome to Dragonvite
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}
      >
        A production-ready monorepo scaffold with React, Fastify, and real-time capabilities
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'center', mt: 4 }}
      >
        <Button variant="contained">Get Started</Button>
        <Button variant="outlined">Learn More</Button>
      </Stack>
    </Box>
  )
}
