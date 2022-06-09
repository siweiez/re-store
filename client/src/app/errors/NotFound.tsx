import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant='h3'>
        Oops! We could not find what you are looking for...
      </Typography>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Button fullWidth size='large' component={Link} to=''>
        Go back to the store
      </Button>
    </Container>
  );
}