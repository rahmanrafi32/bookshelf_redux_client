import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import signUpImage from '../assets/23186847_6736959.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserSignInMutation } from '../redux/features/user/userApi.ts';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { setUser } from '../redux/features/user/userSlice.ts';

const Signin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const [login] = useUserSignInMutation();
  const navigate = useNavigate();
  const handleFieldChange = (field: string, value: string) => {
    setLoginData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    await login(loginData);
    console.log(loginData.username);
    dispatch(setUser(loginData.username));
    navigate('/');
  };

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
              <TextField
                value={loginData.username}
                fullWidth
                label={'Username'}
                onChange={(e) => handleFieldChange('username', e.target.value)}
              />
              <TextField
                value={loginData.password}
                fullWidth
                label={'Password'}
                onChange={(e) => handleFieldChange('password', e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
              >
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
