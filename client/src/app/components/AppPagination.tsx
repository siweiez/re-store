import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalPages, pageSize, totalItemsCount } = metaData;
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
      <Typography variant='body2' sx={{ mb: 2 }}>
        Showing {(currentPage - 1) * pageSize + 1}-{currentPage * pageSize > totalItemsCount ? totalItemsCount : currentPage * pageSize} of {totalItemsCount} results
      </Typography>
      <Pagination
        color='primary'
        shape='rounded'
        size='large'
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
}