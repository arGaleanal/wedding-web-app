import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
// import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectIsLoading } from '../../store/loading/loading.selector';
import PropTypes from 'prop-types';
import {
  Box,
  alpha,
  Dialog,
  lighten,
  Divider,
  IconButton,
  CircularProgress,
  styled,
  useTheme,
  Typography
} from '@mui/material';
import { AjaxModal, AjaxModalContent } from './loading.styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} color="primary"/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.primary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: 'none',
          boxShadow: 'none'
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 7, 52, 0.2)',
          backdropFilter: 'blur(2px)',

          '&.MuiBackdrop-invisible': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(2px)'
          }
        }
      }
    }
  },
});
const DialogWrapper = styled(Dialog)(
  ({ theme }) => (
    ({ theme }) => `
   
    .MuiPaper-root {
      background: none;
      box-shadow: none;
      border: none;
    }
  `)
);
const CircularStatic = () => {
  const [progress, setProgress] = useState(10);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  let modalDiv = (
    <DialogWrapper open={true}>
        <AjaxModalContent>
            <center>
                {/* <CircularProgressWithLabel value={""} />; */}
                <CircularProgress color="primary"/>
            </center>
        </AjaxModalContent>
    </DialogWrapper>
  );

  const loadingModal = (isLoading) ? modalDiv  :  <div/>;
  return (loadingModal);
  //return <CircularProgressWithLabel value={progress} />;
}


export default CircularStatic;

