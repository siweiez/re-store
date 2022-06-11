import { Search } from "@material-ui/icons";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector(state => state.catalog);
  const [searchTermInput, setSearchTermInput] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  function handleInputChange(event: any) {
    setSearchTermInput(event.target.value);
  }

  function handleSearch() {
    dispatch(setProductParams({ searchTerm: searchTermInput }));
  };

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <TextField
          label='Search product...'
          variant='filled'
          fullWidth
          value={searchTermInput}
          onChange={handleInputChange}
        />
        <IconButton color='primary' onClick={handleSearch}>
          <Search />
        </IconButton>
      </Box>
    </>
  );

}