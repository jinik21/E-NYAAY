import React from "react";
import {
  Grid,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PageHeroImage from "../components/PageHeroImage";

const Container = styled(Grid)(({ theme }) => ({
  height: "100vh",
  flexWrap: "nowrap",
}));

const RightContainer = styled(Grid)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "auto",
  flexGrow: 1,
  boxShadow: "0px 0px 10px rgb(0 0 0 / 25%)",
  overflowY: "auto",
}));

const TextInput = styled(TextField)(({ theme }) => ({
  width: 300,
  margin: theme.spacing(1),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: 300,
  margin: theme.spacing(1),
}));

function LoginLawyerPage({ passable }) {
  const classes = {};
  // const dispatch
  const [values, setValues] = React.useState({
    email: "",
    password:""
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3001/lawyer/signin", {
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
        navigate("/dashboardlawyer/starter/", {
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
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ flexGrow: 1 }}
        >
          <Grid item>
            <Typography variant="h4">Welcome back to E_NYAAY</Typography>
          </Grid>
          <form onSubmit={submitForm}>
            <Grid item>
              <TextInput
                autoComplete="on"
                id="outlined-adornment-email"
                label="email"
                value={values.email}
                onChange={handleChange("email")}
                inputProps={{
                  "aria-label": "email",
                }}
                type="email"
                labelWidth={65}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextInput
                autoComplete="on"
                id="outlined-adornment-password"
                label="password"
                value={values.password}
                onChange={handleChange("password")}
                inputProps={{
                  "aria-label": "password",
                }}
                type="password"
                labelWidth={65}
                fullWidth
              />
            </Grid>

            <CustomButton
              className={clsx(classes.margin, classes.textField)}
              variant="contained"
              color="primary"
              fullWidth
              onClick={submitForm}
              type="submit"
            >
              Sign In
            </CustomButton>
          </form>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <CustomButton
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Sign Up
            </CustomButton>
          </Link>
        </Grid>
      </RightContainer>
    </Container>
  );
}

export default LoginLawyerPage;
