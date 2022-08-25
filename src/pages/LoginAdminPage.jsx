import React from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  Button,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PageHeroImage from '../components/PageHeroImage';

const Container = styled(Grid)(({ theme }) => ({
  height: '100vh',
  flexWrap: 'nowrap',
}));

const RightContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'auto',
  flexGrow: 1,
  boxShadow: '0px 0px 10px rgb(0 0 0 / 25%)',
  overflowY: 'auto',
}));

const TextInput = styled(TextField)(({ theme }) => ({
  width: 300,
  margin: theme.spacing(1),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: 300,
  margin: theme.spacing(1),
}));

function LoginAdminPage({passable}) {
  const classes = {};
  // const dispatch
  const [values, setValues] = React.useState({
    password: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const submitForm = async (e) => {
    console.log(values.email);
    console.log(values.password);
    e.preventDefault();
    try {
      fetch("http://localhost:3001/admin/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user.token);
        const userInfo = {
          token: user.token,
          email: user.email,
          name: user.name
        }
        localStorage.setItem('user', JSON.stringify(userInfo));
        navigate("/dashboardadmin/starter/", {
          replace: false,
          state: {
            user: user,
            email: values.email,
            password: values.password
          },
        });
      }).catch((e) => {
        alert(e.message);
      })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container container>
      <PageHeroImage />
      <RightContainer>
        <Grid
          container
          item
          direction='column'
          justifyContent='center'
          alignItems='center'
          style={{ flexGrow: 1 }}
        >
          <Grid item>
            <Typography variant='h4'>Welcome back to E_NYAAY</Typography>
          </Grid>
          <form onSubmit={submitForm}>
            <Grid item>
              <TextInput
                autoComplete='on'
                id='outlined-adornment-email'
                label='Email ID'
                value={values.email}
                onChange={handleChange('email')}
                inputProps={{
                  'aria-label': 'email',
                }}
                labelWidth={65}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextInput
                label='Password'
                autoComplete='off'
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        edge='end'
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                labelWidth={75}
              />
            </Grid>
            <CustomButton
              className={clsx(classes.margin, classes.textField)}
              variant='contained'
              color='primary'
              disabled={values.submitButtonDisable}
              fullWidth
              onClick={submitForm}
              type='submit'
            >
              Sign In
            </CustomButton>
          </form>
        </Grid>
      </RightContainer>
    </Container>
  );
}

export default LoginAdminPage;
