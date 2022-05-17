import React from 'react';
import { Grid, styled } from '@mui/material';
import LoginDisplay from '../images/LoginDisplay.svg';
import LoginBg from '../images/LoginBg.svg';

const LeftContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  background: '#FAFAFA',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const DisplayImage = styled('img')(({ theme }) => ({
  flexGrow: 1,
  height: '60%',
  width: '100%',
  zIndex: '1',
}));

const LeftBackgroundImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  zIndex: '0',
  width: '80%',
  top: 0,
  left: '50%',
  transform: 'translate(-50%)',
}));

function PageHeroImage() {
  return (
    <LeftContainer container md={7}>
      <DisplayImage src={LoginBg} alt='login background' />
      <LeftBackgroundImage src={LoginDisplay} alt='login' />
      {/* <Grid item style={{ zIndex: '1', width: '100%' }}>
        <Slider direction={'left'} />
        <Slider direction={'right'} />
      </Grid> */}
    </LeftContainer>
  );
}

export default PageHeroImage;
