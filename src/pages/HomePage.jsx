import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/user';

const HomePage = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeUser();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      HomePage
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomePage;
