import React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PageHeroImage from "../components/PageHeroImage";
import API from "../config/axios";
import { saveUser } from "../utils/user";

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
    caseId: "",
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser();
      console.log(res);
      navigate("/dashboardlawyer/starter/", {
        replace: false,
        state: {
          user: res,
          caseId: values.caseId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loginUser = async () => {
    const { account, court } = passable;
    let owner, judge, lawyer1, lawyer2;
    await court.methods.owner().call((e, r) => {
      owner = r;
    });
    await court.methods.getCaseAddresses(values.caseId).call((e, r) => {
      if (!e) {
        judge = r.judge;
        lawyer1 = r.lawyer1;
        lawyer2 = r.lawyer2;
      }
    });
    if (account === owner) {
      return 1;
    } else if (account === lawyer1 || account === lawyer2) {
      return 2;
    } else if (account === judge) {
      return 3;
    } else {
      return 4;
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
                id="outlined-adornment-caseId"
                label="Case ID"
                value={values.caseId}
                onChange={handleChange("caseId")}
                inputProps={{
                  "aria-label": "caseId",
                }}
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
              Sign In using Metamask
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
