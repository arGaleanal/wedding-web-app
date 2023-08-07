import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '../../components/alerts/alerts.component';

import { FC, Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  googleSignInStart,
  emailSignInStart,
  resetUserError,
} from '../../store/user/user.action';
import { selectCurrentUser, selectUserError } from '../../store/user/user.selector';
import { useTheme } from '@emotion/react';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Wedding App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultFormFields = {
  email: '',
  password: '',
};

const LogoApp = require("../../utils/images/wedding-app-fill.png");

const SignInForm = () => {
const { t, i18n } = useTranslation();
const [open, setOpen] = useState(false);
const [isError, setError] = useState(false);
const [isErrorPassword, setErrorPassword] = useState(false);
const [messageAlert, setMessageAlert] = useState('');
const [messageType,setMessageType] = useState("error");
const currentUser = useSelector(selectCurrentUser);
const [formFields, setFormFields] = useState(defaultFormFields);
const { email, password } = formFields;
const navigate = useNavigate();
const dispatch = useDispatch();
const loginError = useSelector(selectUserError);
const [logIn, setLogIn] = useState(currentUser);

const resetFormFields = () => {
  setFormFields(defaultFormFields);
};

  useEffect(() => {
    if(loginError){
        if(loginError.code === "auth/invalid-email"){
          alertMessage(t('login.errorMessageEmailPassword'),'error','email');
        } else if (loginError.code === "auth/wrong-password"){
          alertMessage(t('login.errorMessagePassword'),'error','password');
        } else if (loginError.code === 'auth/user-not-found') {
          alertMessage(t('login.errorMessageNoUser'),'error','email');
        }
    }
  }, [loginError]);

  useEffect(() => {
    if(currentUser.id){
      setLogIn(currentUser);
    }
    
  }, [currentUser.id]);
  /*
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };
  */
  const alertMessage = (message:string,type:string, field:string) => {
    setMessageType(type);
    setOpen(true);
    if(field === "password"){
      setMessageAlert(message);
      setErrorPassword(true);
    } else if ( field === "email") {
      setError(true);
      setMessageAlert(message);
    }
    setTimeout(()=>{
      setError(false);
      setErrorPassword(false);
      setMessageAlert('');
      setOpen(false);
    },5000);
  };

  const alertMessageError = (message:string) => {
    setMessageAlert("*"+message);
    setError(true);
    setErrorPassword(true);
    setTimeout(()=>{
      setError(false);
      setErrorPassword(false);
      setMessageAlert('');
      setOpen(false);
    },5000);
  }

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const signInWithGoogle = async () => {
      dispatch(googleSignInStart());
    };
  
  const handleSubmit = () => {
  if(email.length === 0 || password.length === 0){
    alertMessageError(t('login.errorMessageFieldsEmpty'));
    return;
  }
    dispatch(emailSignInStart(email, password));
  };

  const handleChange = (event:any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  const keyPress = (e:any) => {
    if(e.keyCode == 13){
      console.log('value', e.target.value);
      // put the login here
      handleSubmit()
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={LogoApp}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('login.title')}
          </Typography>
          <Box sx={{ mt: 1 }}>
          <TextField
              sx={{
                '.MuiFormHelperText-root': {
                  textTransform: 'none'
                }
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('login.emailLabel')}
              name="email"
              autoComplete="email"
              error={isError}
              onChange={handleChange}
              helperText={isError ? messageAlert : ''}
            />
            <TextField
             sx={{
                '.MuiFormHelperText-root': {
                  textTransform: 'none'
                }
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('login.passwordLabel')}
              type="password"
              onChange={handleChange}
              error={isErrorPassword}
              id="password"
              helperText={isErrorPassword ? messageAlert:''}
              onKeyDown={keyPress}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              {t('login.signInButton')}
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Alert open={open} handleClose={handleClose} message={messageAlert} type={messageType}/>
      </Container>
  );
}

export default SignInForm;