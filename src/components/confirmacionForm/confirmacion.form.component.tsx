import { FC, Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { signUpStart } from '../../store/user/user.action';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '../generals/alerts/alerts.component';
import { selectUserError } from '../../store/user/user.selector';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import _ from 'lodash';

const defaultFormFields = {
    fullName: ''
};

function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Confirmacion = () => {
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageType,setMessageType] = useState("error");
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName } = formFields;
  let { numeroInvitados } = useParams();
  const { t, i18n } = useTranslation();
  const loginError = useSelector(selectUserError);
  const [value, setValue] = useState('female');
  const [aNumeroInvitados, setNumeroInvitados] = useState([1,2,3,4,5,6]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('error',loginError);
    if(loginError){
        if(loginError.code === "auth/email-already-in-use") {
          alertMessage(t('login.errorMessageAlreadyInUse'),'error');
        } else {
          alertMessage(t('login.errorMessageError'),'error');
        }
    }
  }, [loginError]);

  const alertMessage = (message: string, type:string) => {
    setMessageAlert(message);
    setMessageType(type);
    setOpen(true);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const emptyFields = () => {
    let result = false;
    return result;
  };


  const capitalizarPrimeraLetra = (event:any) => {
    const { name, value } = event.target;
    if(value.length === 0){
      return;
    }
    let formalValue = value.charAt(0).toUpperCase() + value.slice(1);
    setFormFields({ ...formFields, [name]: formalValue });
  }

  const handleSubmit = async () => {
    //let capitan = (capitanSignUp === "kpitan")?true:false;
    //dispatch(signUpStart(email, password, name+" "+lastName, name, lastName, capitan));
  };

  const handleClose = (event:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleNumeroInvitados = (event:any) => {
    // let value = event.target.value;
    // let oInvitacion = this.state.invitacion;
    // let oInvitado = this.props.invitado;
    // let aInvitados = [];
    // aInvitados = this.getInvitados(value)

    // oInvitado.confirmados = value;
    // oInvitado.invitados = aInvitados;

    // this.props.actions.saveInvitado(oInvitado);
    // this.setState({invitados:aInvitados})
   };

   const handleAsistencia = (event:any) =>{
    let value = event.target.value;
    //let oInvitacion = this.state.invitacion;
    // let oInvitado = this.props.invitado;
    // let disabled = this.state.disabledForm;
    // //oInvitacion.asistencia = value;
    // if(value === "NO" || value === "TALVEZ"){
    //     disabled = true
    // }else{
    //     disabled = false;
    // }
    // oInvitado.asistencia = value;
    // this.props.actions.saveInvitado(oInvitado);
    // this.setState({disabledForm:disabled});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const aNumeroInvitados2 = _.filter(aNumeroInvitados,function(numero){ return Number(numeroInvitados) >= numero});

  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 20px',
            paddingBottom: '50px',
            marginLeft: '60px',
            marginRight: '60px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon fontSize='medium'/>
          </Avatar>
          <Typography component="h1" variant="h5">
            {/* {t('login.signUp.title')} */}
            Confirmacion
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('register.formAsistencia')}</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="asistencia"
                    value={''}
                    label={t('register.asistenciaLabel')}
                    onChange={handleAsistencia}
                    >
                    <MenuItem value="" disabled>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem key={0} value={"SI"}>{t('register.SI')}</MenuItem>
                    <MenuItem key={1} value={"NO"}>{t('register.NO')}</MenuItem>
                    <MenuItem key={2} value={"TALVEZ"}>{t('register.MAYBE')}</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {aNumeroInvitados2.map((item,index) => (<FormControlLabel key={index} control={<Radio />} value={item} label={item}/>))}
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  name='password'
                  label={t('register.formNombreInvitado')}
                  id="invitado"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={()=>{}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('register.confirm')}
            </Button>
          </Box>
        </Paper>
        <Alert open={open} handleClose={handleClose} message={messageAlert} type={messageType}/>
      </Container>
  );
}

export default Confirmacion;