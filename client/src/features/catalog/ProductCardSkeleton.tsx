import { Card, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Grid item xs component={Card}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
      />
      <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} width='40%' style={{ marginBottom: 23, marginTop: 10 }} />
          <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 9 }} />
        </>
      </CardContent>
      <CardContent>
        <Grid display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Skeleton animation="wave" height={10} width='30%' style={{ marginBottom: 16 }} />
          <Skeleton animation="wave" height={10} width="50%" />
        </Grid>
      </CardContent>
    </Grid>
  )
}