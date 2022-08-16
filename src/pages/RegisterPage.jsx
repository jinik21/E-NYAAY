import React from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  Button,
  styled,
  TextField,
  Typography,
  Select,
  MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import PageHeroImage from '../components/PageHeroImage';
import API from '../config/axios';
import { saveUser } from '../utils/user';
import "../models/states"
import Axios from 'axios';

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

function RegisterPage() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    phone: "",
    barNo: "",
    city: "",
    state: "",
    password: "",
    showPassword: false,
    submitButtonDisable: false,
  });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const submitForm = async (e) => {
    setValues({ ...values, submitButtonDisable: true });
    e.preventDefault();
    try {
    //   const result = await Axios.post('http://localhost:3001/lawyer/signup',{
    //     name: values.name,
    //     email: values.email,
    //     password: values.password,
    //     phone: values.phone,
    //     barNo: values.barNo,
    //     state:values.state,
    //     city:values.city,
    //   })
    //   console.log(result);
      fetch("http://localhost:3001/lawyer/signup", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        barNo: values.barNo,
        state:values.state,
        city:values.city,
      }),
    })
      .then((response) => response.json())
      .then((user) => {

        console.log(user);
        navigate("/login_lawyer", {
          replace: false,
          state: {
            user: user,
            email: values.email,
            password: values.password
          },
        });
      }).catch((e) => {
        console.log(e);
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
            <Typography variant='h4'>Register</Typography>
          </Grid>
          <form onSubmit={submitForm}>
            <Grid item>
              <TextInput
                autoComplete='off'
                id='outlined-adornment-fullName'
                label='Full Name'
                value={values.name}
                onChange={handleChange('name')}
                inputProps={{
                  'aria-label': 'fullName',
                }}
                labelWidth={65}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextInput
                autoComplete='off'
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
                autoComplete='off'
                id='outlined-adornment-mobile'
                label='Mobile Number'
                value={values.phone}
                onChange={handleChange('phone')}
                inputProps={{
                  'aria-label': 'mobile',
                }}
                labelWidth={65}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextInput
                autoComplete='off'
                id='outlined-adornment-barRegistrationNumber'
                label='Bar registration number'
                value={values.barNo}
                onChange={handleChange('barNo')}
                inputProps={{
                  'aria-label': 'barRegistrationNumber',
                }}
                labelWidth={65}
                fullWidth
              />
            </Grid>
            <Grid>
            <div class="form-group col-md-6">
              <label for="inputDistrict">State</label>
              <select class="form-control" id="inputDistrict" onChange={handleChange('state')} value={values.state}>
                        <option value="Andra Pradesh">Andra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madya Pradesh">Madya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">NCT of Delhi</option>
                        <option value="Lakshadeep">Lakshadeep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Ladakh">Ladakh</option>
              </select>
            </div>
            </Grid>

            <Grid item>
              <TextInput
                autoComplete='off'
                id='outlined-adornment-city'
                label='District/ City/ Region'
                value={values.city}
                onChange={handleChange('city')}
                inputProps={{
                  'aria-label': 'city',
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
              variant='contained'
              color='primary'
              disabled={values.submitButtonDisable}
              fullWidth
              onClick={submitForm}
              type='submit'
            >
              Sign Up
            </CustomButton>
          </form>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <CustomButton
              variant='outlined'
              color='primary'
              disabled={values.submitButtonDisable}
              fullWidth
            >
              Sign In
            </CustomButton>
          </Link>
        </Grid>
      </RightContainer>
    </Container>
  );
}

export default RegisterPage;
