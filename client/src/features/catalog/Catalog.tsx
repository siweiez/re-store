import { Divider, FormLabel, Grid, Pagination, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import CheckboxButtonGroup from "../../app/components/CheckboxButtonGroup";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions =
  [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'price', label: 'Price - Low to High' },
  ];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (status.includes('pending')) return <LoadingComponent message='Loading products...' />;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.sortBy}
              options={sortOptions}
              onChange={(event) => dispatch(setProductParams({ sortBy: event.target.value }))}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            Filter by:
            <Divider sx={{ mt: 1, mb: 1 }} />
            <FormLabel id="checkbox-buttons-group-label">Brands</FormLabel>
            <CheckboxButtonGroup
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
            />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <FormLabel id="checkbox-buttons-group-label">Types</FormLabel>
            <CheckboxButtonGroup
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
            <Typography sx={{ mb: 2 }}>
              Displaying 1-6 of 20 items
            </Typography>
            <Pagination
              color='secondary'
              size='large'
              count={10}
              page={2}
            />
          </Box>
        </Grid>

      </Grid>

    </>
  )
}