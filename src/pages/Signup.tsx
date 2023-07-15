import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import signUpImage from '../assets/23186847_6736959.jpg';
import { Link } from 'react-router-dom';

const Signup = () => {
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
            <Typography variant={'h2'} align={'center'} sx={{ pb: 5 }}>
              Signup
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TextField fullWidth placeholder={'Username'} />
              <TextField fullWidth placeholder={'Password'} />
              <TextField fullWidth placeholder={'Confirm Password'} />
              <Button fullWidth variant="contained" size="large">
                Signup
              </Button>
              <Typography variant={'subtitle1'}>
                Already have an account? <Link to={'/signin'}>Sign in</Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
