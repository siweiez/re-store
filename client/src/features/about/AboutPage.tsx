import { Container, Divider, Typography } from "@mui/material";


export default function AboutPage() {

  return (
    <Container>
      <Typography
        gutterBottom
        variant='h2'
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        ABOUT US
      </Typography>
      <Divider />
      <Typography
        variant='h5'
        sx={{ pt: 3, pl: 3, pr: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        We are a fake company and we sell fake products. This is a fake store that is established in 2045.
        Thank you.
      </Typography>
      <Typography
        variant='h5'
        sx={{ p: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Typography>

    </Container>
  )
}