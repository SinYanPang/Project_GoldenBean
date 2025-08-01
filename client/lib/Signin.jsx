import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper.js';
import { signin } from './api-auth.js';

// Styled components using MUI v5's styled API
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.spacing(2)
}));

export default function Signin() {
  const location = useLocation();

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
  const user = {
    email: values.email || undefined,
    password: values.password || undefined
  };

  console.log("Submitting:", user); // Debug log

  signin(user).then((data) => {
    console.log("Sign-in response:", data); // Debug log
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      auth.authenticate(data, () => {
        setValues({ ...values, error: '', redirectToReferrer: true });
      });
    }
  });
};


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || { from: { pathname: '/' } };
  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
          Sign In
        </Typography>
        <StyledTextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <StyledTextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />
        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ verticalAlign: 'middle' }}>error</Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </SubmitButton>
      </CardActions>
    </StyledCard>
  );
}