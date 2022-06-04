import { Container, Typography, ButtonGroup, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log('not shown'))
      .catch(error => setValidationErrors(error));
  }

  return (
    <Container>
      <Typography gutterBottom variant='h2'>Errors for testing</Typography>
      <ButtonGroup fullWidth>
        <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>400</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>401</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>404</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>500</Button>
        <Button variant='contained' onClick={getValidationError}>Validation</Button>
      </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>}
    </Container>
  )
}