import { Button, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedInMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color='inherit'
        sx={{ typography: 'h6' }}
      >
        {user?.email}
      </Button>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ justifyContent: 'flex-end', m: 0.8 }} component={Link} to='/orders'>Orders</MenuItem>
        <MenuItem sx={{ justifyContent: 'flex-end', m: 0.8 }} onClick={() => {
          dispatch(signOut());
          dispatch(clearBasket());
        }}>Sign out</MenuItem>
      </Popover>
    </>
  );
}