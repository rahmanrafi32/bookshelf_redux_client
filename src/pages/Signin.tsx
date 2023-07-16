import {
  AlertColor,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import signUpImage from '../assets/23186847_6736959.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserSignInMutation } from '../redux/features/user/userApi.ts';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { setUser } from '../redux/features/user/userSlice.ts';
import CustomSnackbar from '../components/CustomSnackbar.tsx';

const Signin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >('success');
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
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleLogin = async () => {
    const res = await login(loginData);

    if ('data' in res) {
      const { data } = res;
      dispatch(
        setUser({
          username: loginData.username,
          accessToken: data?.data?.accessToken,
        })
      );
      navigate('/');
    } else {
      setOpenSnackbar(true);
      setSnackbarMessage('Incorrect Credentials');
      setSnackbarSeverity('error');
    }
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
                type={'password'}
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
      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
    </Grid>
  );
};

export default Signin;
