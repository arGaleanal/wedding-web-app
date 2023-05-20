import { FC, Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/generals/alerts/alerts.component';
import { selectUserError } from '../../store/user/user.selector';
import { 
  FormControl, 
  FormControlLabel, 
  InputBase, 
  InputLabel, 
  MenuItem, 
  Paper, 
  Select, 
  styled, 
  useTheme, 
  Radio, 
  RadioGroup,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import { createConfirmacionStart } from '../../store/confirmaciones/confirmacion.action';
import _ from 'lodash';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const CssTextField = styled(TextField)(
    ({ theme }) => `
      & .MuiInputLabel-root {
        color: ${theme.colors.secondary.main};
      }
      & .MuiOutlinedInput-root {
        & fieldset {
            border-color: ${theme.colors.secondary.main};
        }
      }
  `
);
const CustomInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputLabel-root':{
        color: theme.colors.secondary.main,
    },
    '& .MuiInputBase-input': {
      borderColor: theme.colors.secondary.main,
    },
  }));
  
const defaultFormFields = {
    nombreInvitado: '',
    numeroInvitados: 0,
    asistencia: ''
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
  const [confirmacionFormFields, setConfirmacionFormFields] = useState(defaultFormFields);
  const { nombreInvitado, numeroInvitados, asistencia } = confirmacionFormFields;
  let { nInvitados, token } = useParams();
  const { t, i18n } = useTranslation();
  const loginError = useSelector(selectUserError);
  const [aNumeroInvitados, setNumeroInvitados] = useState([1,2,3,4,5,6]);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    if(loginError){
        if(loginError.code.length > 0) {
          alertMessage(t('confirmacion.errorMessageError'),'error');
        }
    }
  }, [loginError]);

  useEffect(() => {
    console.log('token',token);
    if(token){
        checkInvitacion(token, nInvitados);
    }
  }, []);

  const alertMessage = (message: string, type:string) => {
    setMessageAlert(message);
    setMessageType(type);
    setOpen(true);
  };

  const resetFormFields = () => {
    setConfirmacionFormFields(defaultFormFields);
  };

  const checkInvitacion = (nInvitacionId:any, nInvitados:any) =>{
    console.log('nInvitacionId',nInvitacionId);
    console.log('nInvitados',nInvitados);
    if(typeof Number(nInvitados) !== 'number' || isNaN(nInvitados) || Number(nInvitados) > 6) {
      navigate('/error-page');
    }
    // let self = this;
    // //let oInvitacion = this.props.invitacion;
    //   var docRef = database.collection("invitaciones").doc(nInvitacionId);
    //   self.props.actions.saveMensajeError("Link de confirmación es invalido por favor intentar con uno valido");
    //   docRef.get().then((doc) => {
    //     console.log('checking...',doc);
    //           //self.props.actions.saveMensajeError("Link de confirmación es invalido por favor intentar con uno valido");
    //           if(doc.exists && doc.id === nInvitacionId && doc.data().numeroInvitados === nInvitados){
    //             if(doc.data().status === "CONFIRMADA"){
    //               console.log('CONFIRMADA');
    //               self.setState({openAlert: true,alertConfirmada:true});
    //               self.props.actions.ajaxCallHasFinished();
    //               //self.props.history.push('/');
    //               //self.props.actions.ajaxCallHasFinished();
    //              }else{
    //               let object = doc.data();
    //               object.id = doc.id;
    //               self.props.actions.saveInvitacion(object);
    //               self.props.actions.ajaxCallHasFinished();
    //              }
    //           }else{
    //             self.props.actions.openErrorMesanje()
    //             self.props.history.push('/');
    //             self.props.actions.ajaxCallHasFinished();
    //           }
               
    //   }).catch((error) => {
    //     self.props.actions.openErrorMesanje()
    //       self.props.history.push('/');
    //       self.props.actions.ajaxCallHasFinished();
    //   });   
  }

  const capitalizarPrimeraLetra = (event:any) => {
    const { name, value } = event.target;
    if(value.length === 0){
      return;
    }
    const words = value.split(' ');
    
    // Capitalizar la primera letra de cada palabra
    const capitalizedWords = words.map((word:any) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    // let formalValue = value.charAt(0).toUpperCase() + value.slice(1);
    setConfirmacionFormFields({ ...confirmacionFormFields, [name]: capitalizedWords });
  };

  const handleSubmit = async () => {
    const bEmptyFields = emptyFields();
    if(bEmptyFields) {
      emptyFieldsMessage();
      return;
    }
    dispatch(createConfirmacionStart(confirmacionFormFields));
    setTimeout(()=>{
      setShowThanksMessage(true);
    },1500);
  };

  const emptyFieldsMessage = () => {
    if(asistencia.length === 0 || nombreInvitado.length === 0){
      alertMessage(t('confirmacion.errorMessageFieldsEmpty'), 'error');
      return;
    } else if(numeroInvitados === 0){
      alertMessage(t('confirmacion.errorMessageErrorCeroInvitados'), 'error');
      return;
    }
  };

  const emptyFields = () => {
    let result = false;
    if(asistencia.length === 0){
      result = true;
    }
    if(nombreInvitado.length === 0){
      result = true;
    }
    if(numeroInvitados === 0){
      result = true;
    }
    return result;
  };

  const handleClose = (event:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    let sValue = value;
    if ( name === "numeroInvitados"){
        sValue = Number(sValue);
    }
    setConfirmacionFormFields({ ...confirmacionFormFields, [name]: sValue });
  };

  const aNumeroInvitados2 = _.filter(aNumeroInvitados,function(numero){ return Number(nInvitados) >= numero});
  console.log('confirmacionFormFields',confirmacionFormFields)
  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isMobile ? '10px 9px' : '10px 20px',
            paddingBottom: '50px',
            marginLeft: isMobile ? '0px' : '60px',
            marginRight: isMobile ? '0px' :'60px',
          }}
        >
          {showThanksMessage ? 
          <>
          <Avatar sx={{ mt: 4, background: 'none', width: 65, height: 65 }}>
            <TaskAltIcon sx={{color:`${theme.colors.primary.main}`,fontSize: '70px'}}/>
          </Avatar>
          <Box sx={{ mt: 2 }}>
              <Box sx={{ p: 3, display:'flex', justifyContent:'center', alignContent:'center'}}>
              <Typography component="h1" variant="h5" color="primary" align='center' sx={{fontSize: '18px'}}>
                {t('confirmacion.messageConfirmacion')}
              </Typography>
              </Box>
          </Box>
          </>
          :
          <>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 65, height: 65 }}>
            <DraftsIcon fontSize='large' color="primary"/>
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            {/* {t('login.signUp.title')} */}
            Confirmacion
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" 
                        sx={{
                            '&.MuiInputLabel-root': {
                                color: theme.colors.secondary.main,
                                '&.Mui-focused' :{
                                    color: theme.colors.primary.main,
                                }
                            }}}
                    >{t('register.formAsistencia')}</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="asistencia"
                    value={asistencia}
                    required
                    label={t('register.formAsistencia')}
                    onChange={handleChange}
                    sx={{
                        color: theme.colors.secondary.main,
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.colors.secondary.main,
                        },
                    }}
                    >
                    <MenuItem value="" disabled>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem key={0} value={"SI"}>{t('register.SI')}</MenuItem>
                    <MenuItem key={1} value={"NO"}>{t('register.NO')}</MenuItem>
                    {/* <MenuItem key={2} value={"TALVEZ"}>{t('register.MAYBE')}</MenuItem> */}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="numeroInvitados"
                    value={numeroInvitados}
                    onChange={handleChange}
                >
                    {aNumeroInvitados2.map((item,index) => (
                        <FormControlLabel 
                            key={index} 
                            control={<Radio />} 
                            value={item} 
                            label={item} 
                            sx={{
                            color: theme.colors.secondary.main,
                            '&.Mui-checked': {
                              color: theme.colors.primary.main
                            },
                          }}/>
                    ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name='nombreInvitado'
                  label={t('register.formNombreInvitado')}
                  id="nombreInvitado"
                  onChange={handleChange}
                  value={nombreInvitado}
                  onBlur={capitalizarPrimeraLetra}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('register.confirm')}
            </Button>
          </Box>
          </>
          }
        </Paper>
        <Alert open={open} handleClose={handleClose} message={messageAlert} type={messageType}/>
      </Container>
  );
}

export default Confirmacion;