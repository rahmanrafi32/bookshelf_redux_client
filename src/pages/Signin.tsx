import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import signUpImage from '../assets/23186847_6736959.jpg';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Grid item xs={6}>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item>
            <img
              style={{ height: '60vh', width: '30vw' }}
              src={signUpImage}
              alt="signup image"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="row" justifyContent="center">
          <Grid item sx={{ width: '24vw' }}>
            <Typography variant={'h2'} align={'center'} sx={{ pb: 3 }}>
              Sign In
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TextField fullWidth placeholder={'Username'} />
              <TextField fullWidth placeholder={'Password'} />
              <Button fullWidth variant="contained" size="large">
                Sign In
              </Button>
              <Typography>
                Don't have an account? <Link to={'/signup'}>Signup</Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
