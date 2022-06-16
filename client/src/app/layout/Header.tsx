import { ShoppingBag } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
};

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:hover':
  {
    color: 'grey.500'
  },
  '&.active':
  {
    color: 'text.secondary'
  }
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const itemsCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static'>
      <Toolbar
        sx={
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }>

        <Box display='flex' alignItems='center'>
          <Typography
            variant='h6'
            component={NavLink}
            to='/' exact
            sx={navStyles}
          >
            A STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: 'flex' }}>
          <ListItem
            component={NavLink}
            to='/catalog'
            key='/catalog'
            sx={navStyles}
          >
            PRODUCTS
          </ListItem>
          <ListItem
            component={NavLink}
            to='/about'
            key='/about'
            sx={navStyles}
          >
            ABOUT US
          </ListItem>
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemsCount} color='secondary'>
              <ShoppingBag />
            </Badge>
          </IconButton>

          {user ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <SignedInMenu />
            </Box>
          ) : (
            <List sx={{ display: 'flex' }}>
              <ListItem
                component={NavLink}
                to='/signin'
                key='/signin'
                sx={navStyles}
              >
                SIGN IN
              </ListItem>
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}