import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import signUpImage from '../assets/23186847_6736959.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { setUser } from '../redux/features/user/userSlice.ts';
import { useUserSignUpMutation } from '../redux/features/user/userApi.ts';

const Signup = () => {
  const [signupData, setSignUpData] = useState({
    username: '',
    confirmPassword: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUp] = useUserSignUpMutation();
  const handleFieldChange = (field: string, value: string) => {
    setSignUpData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (field === 'confirmPassword' && value !== signupData.password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSignUp = async () => {
    await signUp(signupData);
    dispatch(setUser(signupData.username));
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
            <Typography variant={'h2'} align={'center'} sx={{ pb: 5 }}>
              Signup
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TextField
                fullWidth
                placeholder={'Username'}
                onChange={(e) => handleFieldChange('username', e.target.value)}
              />
              <TextField
                fullWidth
                type={'password'}
                placeholder={'Password'}
                onChange={(e) => handleFieldChange('password', e.target.value)}
              />
              <TextField
                fullWidth
                type={'password'}
                placeholder={'Confirm Password'}
                onChange={(e) =>
                  handleFieldChange('confirmPassword', e.target.value)
                }
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={!!passwordError}
                onClick={handleSignUp}
              >
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
