import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  TextField,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Grid
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';

import { ConfirmacionesArray, Asistencia } from './confirmaciones_types';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import QueueIcon from '@mui/icons-material/Queue';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BulkActions from './BulkActions';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../store/user/user.selector';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
// import { deleteJugadorStart, updateJugadorStart } from '../../../../store/jugador/jugador.action';
// import JugadorEditForm from '../../../../components/jugador-form/jugador-edit-form.component';
// import { selectEquipo, selectEquipos } from '../../../../store/equipo/equipo.selector';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../utils/firebase/firebase.utils';
import { Shield } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
// import { selectJugador } from '../../../../store/jugador/jugador.selector';
import { useNavigate } from 'react-router-dom';
import { selectAppTheme } from '../../../../store/utils/utils.selector';
import Label from '../../../../components/Label';
import { deleteConfirmacionStart, updateConfirmacionStart } from '../../../../store/confirmaciones/confirmacion.action';
import { selectAllConfirmaciones } from '../../../../store/confirmaciones/confirmacion.selector';

const CreateLinkDialog = (props: { onClose: any; open: boolean; confirmacion: any; token: string }) => {
  const { onClose, open, confirmacion, token} = props;
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [showLink, setShowLink] = useState(false);
  const [numeroInvitados, setNumeroInvitados] = useState('');
  const [linkInvitacion, setLinkInvitacion] = useState('');

  const [message, setMessage] = useState('');
  const [showError, setShowMessage] = useState(false);
  const [colorMessage, setColorMessage] = useState('red');

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
  }, []);

  const handleClose = () => {
    setShowLink(false);
    setShowMessage(false);
    setMessage('');
    setLinkInvitacion('');
    setNumeroInvitados('');
    onClose('create');
  };

  const deleteJugador = () => {
    // dispatch(deleteJugadorStart(jugador.id,jugador.idUser,jugador.idEquipo));
    setTimeout(()=>{ handleClose(); },800)
  }

  const handleMessage = (sMessage: string, sType: string) => {
    let sColor = sType === 'error' ? 'red' : 'green';
    setColorMessage(sColor);
    setMessage(sMessage);
  };

  const handleShowLink = () => {
    if (numeroInvitados.length === 0) {
      setShowMessage(true);
      handleMessage('No se puede generar un link con 0 invitados','error')
      setTimeout(()=>{ setShowMessage(false); handleMessage('','error')},4000)
      return;
    };
    let url = window.location.origin+ '/invitacion/' + token + '/confirmacion/' + numeroInvitados;
    console.log('here',url)
    setShowLink(true);
    setLinkInvitacion(url);
  };

  const handleNumeroInvitados = (event: any) => {
    const { value } = event.target;
    setNumeroInvitados(value);
  };

  const handleCopyLink = () => {
    setShowMessage(true);
    handleMessage('"El link ha sido copiado','success')
    navigator.clipboard.writeText(linkInvitacion);
    setTimeout(()=>{ setShowMessage(false); handleMessage('','error')},3000)

  }
  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="alert-dialog-title">
          {"Create Link"}
        </DialogTitle>
      <DialogContent>
          <Box sx={{ mt: 3, maxWidth: 405 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sx={{alignItems:'center',justifyContent:'center',display:'flex'}}>
                  <Box pr={2}>
                    {t('tablaConfirmaciones.numeroInvitadosLabel')}:
                  </Box>
                  <TextField
                  required
                  name='numeroInvitados'
                  type='number'
                  id="numeroInvitados"
                  sx={{maxWidth: 60,mr:2}}
                  placeholder={'0'}
                  onChange={handleNumeroInvitados}
                  value={numeroInvitados}
                  />
                  <Tooltip disableTouchListener disableFocusListener title="Generar link" arrow={true}>
                    <IconButton
                      onClick={handleShowLink}
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main,
                        mr:2
                      }}
                      color="inherit"
                      size="medium"
                    >
                      <AddCircleOutlineIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                { showLink ? 
                  <>
                    <Grid item xs={12} sx={{marginTop: '25px'}}>
                        <Typography textAlign={'center'} sx={{fontWeight:'bold'}}>Link</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={{ sm: 'left' }} sx={{alignItems:'center',display:'flex'}}>
                        <Box sx={{fontSize:11,fontWeight:400, overflow:'hidden', marginRight: 1}}>
                          {linkInvitacion}
                        </Box>
                        <Tooltip disableTouchListener disableFocusListener title="Copy Link" arrow={true}>
                          <IconButton
                            onClick={handleCopyLink}
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                    </Grid>   
                  </>
                  :null
                }
                
            </Grid>
          </Box>
      </DialogContent>
      <DialogActions>
        {showError ? <Typography variant="h6" style={{color: colorMessage, display:'flex', flexGrow:1,marginLeft:20, fontSize:'12px'}}>*{message}*</Typography> : <></>}
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateLinkDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  confirmacion: PropTypes.object
};

const DeleteDialog = (props: { onClose: any; open: boolean; confirmacion: any; }) => {
  const { onClose, open, confirmacion} = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    onClose('delete');
  };

  const deleteJugador = () => {
    dispatch(deleteConfirmacionStart(confirmacion.id));
    setTimeout(()=>{ handleClose(); },800)
  }
  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="alert-dialog-title">
          {"Eliminar Confirmacion?"}
        </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {`Se borra la confirmacion de ${confirmacion.nombreInvitado}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteJugador}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
  
DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    confirmacion: PropTypes.object
};

const defaultFormFields = {
  nombreInvitado: '',
  numeroInvitados: 0,
  asistencia: ''
};

const EditDialog = (props: { onClose: any; open: boolean; confirmacion: any; setConfirmacionEdit:any; }) => {
    const { onClose, open, confirmacion, setConfirmacionEdit} = props;
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const theme = useTheme();
  
    useEffect(() => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
    }, []);

    useEffect(() => {
      setTimeout(()=> {
        setShowError(false)
      },10000)
    }, [error]);

    
    const emptyFields = () => {
      let result = false;
      if(confirmacion.nombreInvitado.length === 0){
        result = true;
      }
      if(confirmacion.numeroInvitados <= 0){
        result = true;
      }
      //asistencia
      return result;
    };

    const handleClose = () => {
      onClose('edit');
    };

    const handleChange = (event:any) => {
      const { name, value } = event.target;
      let sValue = value;
      if ( name === "numeroInvitados"){
          sValue = Number(sValue);
      }
      setConfirmacionEdit({ ...confirmacion, [name]: sValue });
    };
  
    const handleUpdate = (event: any) => {
      event.preventDefault();
      let camposVacios = emptyFields();
      setShowError(camposVacios);
      if (camposVacios) {
        if(confirmacion.nombreInvitado.length === 0){
          setError('El nombre del jugador no debe estar vacio');
          return;
        } else if ( confirmacion.numeroInvitados <= 0) {
          setError('El numero del jugador no debe ser 0');
          return;
        }
      }
      console.log('handleUpdate',confirmacion)
      dispatch(updateConfirmacionStart(confirmacion));
      setTimeout(()=>{ handleClose(); },800);
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
      setConfirmacionEdit({ ...confirmacion, [name]: capitalizedWords });
    }

    return (
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
          <DialogTitle id="alert-dialog-title">
            {"Editar Confirmacion"}
          </DialogTitle>
        <DialogContent>
        <Grid container spacing={2} sx={{marginTop:0}}>
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
                    value={confirmacion.asistencia}
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
                    <MenuItem key={2} value={"TALVEZ"}>{t('register.MAYBE')}</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name='numeroInvitados'
                  type='number'
                  id="numeroInvitados"
                  placeholder={'0'}
                  onChange={handleChange}
                  value={confirmacion.numeroInvitados}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='nombreInvitado'
                  label={t('register.formNombreInvitado')}
                  id="nombreInvitado"
                  onChange={handleChange}
                  value={confirmacion.nombreInvitado}
                  onBlur={capitalizarPrimeraLetra}
                />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          {showError ? <Typography variant="h6" style={{color: 'red',display:'flex', flexGrow:1,marginLeft:20}}>*{error}*</Typography> : <></>}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
    
EditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    confirmacion: PropTypes.object
};

interface BaseTableProps {
  className?: string;
  confirmaciones: ConfirmacionesArray[];
}

interface Filters {
  asistencia: Asistencia;
}

const applyPagination = (
  confirmaciones: ConfirmacionesArray[],
  page: number,
  limit: number
): ConfirmacionesArray[] => {
  return confirmaciones.slice(page * limit, page * limit + limit);
};

const BaseTable: FC<BaseTableProps> = ({ confirmaciones }) => {
  const navigate = useNavigate();
  //const [filtro, setFiltro] = useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  //Jugador Edit/Delete
  const [confirmacionEdit, setConfirmacionEdit] = useState(defaultFormFields);
  const [token, setToken] = useState('');

  // Search
  const [filteredList, setFilteredList] = useState(confirmaciones);
  const allConfirmaciones: ConfirmacionesArray[] = useSelector(selectAllConfirmaciones);
  const [busqueda, setBusqueda] = useState('');

  // Pagination
  const [selectedConfirmacionesArray, setSelectedConfirmacionesArray] = useState<string[]>([]);
  const selectedBulkActions = selectedConfirmacionesArray.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // Match Media
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    setFilteredList(confirmaciones)
  }, [confirmaciones]);

  const requestSearch = (searched:string) => {

    if(searched.length > 0){
      // const filteredRows = filteredList.filter((row) => {
      //   return row.nombreInvitado.toLowerCase().includes(searched.toLowerCase());
      // });
      const filteredRows = filteredList.filter((item) =>
      item.nombreInvitado.toLowerCase().includes(searched.toLowerCase()) ||
      item.numeroInvitados.toString().includes(searched) ||
      (item.asistencia && item.asistencia.toLowerCase().includes(searched.toLowerCase()))
    );
      setFilteredList(filteredRows);
    } else {
      setFilteredList(allConfirmaciones);
    } 
  };

  const filtrarConfirmaciones = (confirmacion:any) => {
    const { nombreInvitado, numeroInvitados, asistencia } = confirmacion;
    const busquedaLowerCase = busqueda.toLowerCase();

    return (
      nombreInvitado.toLowerCase().includes(busquedaLowerCase) ||
      numeroInvitados.toString().includes(busquedaLowerCase) ||
      asistencia.toLowerCase().includes(busquedaLowerCase)
    );
  };

  const handleChangeSearch = ( event : ChangeEvent<HTMLInputElement>): void => {
    const {value} = event.target;
    setBusqueda(value);
    // requestSearch(value);
  };

  const generateToken = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    const expiration = Date.now() + 60 * 60 * 1000; // fecha de caducidad en una hora
    const tokenObj = { token, expiration };
    //db.ref(`tokens/${token}`).set(tokenObj);
    return token;
  }
  
  const handleClickOpen = (type:string, confirmacion?:any) => {
    var sToken = '';
    if(type === "edit"){
      setOpenEdit(true);
    } else if(type === "create") {
      setOpenCreate(true);
      sToken = generateToken(20);
      // dispatch(createToken(sToken))
    } else {
      setOpen(true);
    }
    setToken(sToken);
    setConfirmacionEdit(confirmacion)
  };

  const handleClose = (type:string) => {
    if(type === "edit"){
      setOpenEdit(false);
    } else if(type === "create") {
      setOpenCreate(false);
    } else {
      setOpen(false);
    }
    setConfirmacionEdit(defaultFormFields)
  };

  const handleSelectAllConfirmacionesArray = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedConfirmacionesArray(
      event.target.checked
        ? confirmaciones.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneConfirmacionArray = (
    event: ChangeEvent<HTMLInputElement>,
    jugadorArrayId: string
  ): void => {
    if (!selectedConfirmacionesArray.includes(jugadorArrayId)) {
      setSelectedConfirmacionesArray((prevSelected) => [
        ...prevSelected,
        jugadorArrayId
      ]);
    } else {
      setSelectedConfirmacionesArray((prevSelected) =>
        prevSelected.filter((id) => id !== jugadorArrayId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };


  const getStatusLabel = (asistencia: Asistencia): JSX.Element => {  
    const map = {
      NO: {
        text: t('tablaConfirmaciones.NO'),
        color: 'error'
      },
      SI: {
        text: t('tablaConfirmaciones.SI'),
        color: 'greenDark'
      },
      TALVEZ: {
        text: t('tablaConfirmaciones.MAYBE'),
        color: 'warning'
      },
    };
  
    const { text, color }: any = map[asistencia];
  
    return <Label color={color}>{text}</Label>;
  };
// ========================= Confirmacion Edit ===============================================

const camalize = (str:string) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

// ======================================================================================

  //const filteredJugadoresArray = filteredList;
  const confirmacionesFiltradas = filteredList.filter(filtrarConfirmaciones);
  const paginatedConfirmacionesArray = applyPagination(
    confirmacionesFiltradas,
    page,
    limit
  );
  const selectedSomeConfirmacionesArray =
    selectedConfirmacionesArray.length > 0 &&
    selectedConfirmacionesArray.length < confirmaciones.length;
  const selectedAllConfirmacionesArray =
  selectedConfirmacionesArray.length === confirmaciones.length;
  const theme = useTheme();

  const { t, i18n } = useTranslation();

  moment.locale(`${i18n.resolvedLanguage}`);
  return (
    <>
    <Card sx={{maxHeight: isMobile ? '630px':'initial'}}>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title={
            <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
              <FormControl fullWidth variant="outlined">
              <OutlinedInput
                size="small"
                fullWidth
                id="outlined-adornment-password"
                placeholder={`${t('tablaConfirmaciones.searchLabel')}`}
                onChange={handleChangeSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      //onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      disabled
                      style={{color: theme.colors.primary.light}}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{display: 'flex', alignItems: 'center',marginLeft:2}}>
            <Tooltip disableTouchListener disableFocusListener title="Create Link" arrow={true}>
              <span>
              <IconButton
                onClick={()=>{ handleClickOpen('create',{});}}
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter
                  },
                  color: theme.palette.primary.main
                }}
                color="inherit"
                size="large"
              >
                <QueueIcon fontSize="large" />
              </IconButton>
              </span>
            </Tooltip>
            </Box>
            </Box>
          }
        ></CardHeader>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllConfirmacionesArray}
                  indeterminate={selectedSomeConfirmacionesArray}
                  onChange={handleSelectAllConfirmacionesArray}
                />
              </TableCell>
              <TableCell align='center'>#</TableCell>
              <TableCell align='left'>{t('tablaConfirmaciones.nombreInvitadoLabel')}</TableCell>
              <TableCell align='center'>{t('tablaConfirmaciones.numeroInvitadosLabel')}</TableCell>
              <TableCell align='center'>{t('tablaConfirmaciones.asistenciaLabel')}</TableCell>
              <TableCell align='center'>{t('tablaConfirmaciones.fechaConfirmacion')}</TableCell>
              <TableCell align="center">{t('tablaConfirmaciones.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedConfirmacionesArray.map((oConfirmacion,index) => {
              const isConfirmacionArraySelected = selectedConfirmacionesArray.includes(
                oConfirmacion.id
              );
              return (
                <TableRow
                  hover
                  style={{cursor:'pointer'}}
                  key={oConfirmacion.id}
                  selected={isConfirmacionArraySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isConfirmacionArraySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneConfirmacionArray(event, oConfirmacion.id)
                      }
                      value={isConfirmacionArraySelected}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {index+1}
                    </Typography>
                  </TableCell>
                  <TableCell >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      alignSelf="center"
                      gutterBottom
                      noWrap
                      style={{marginTop: 4, marginLeft:10}}
                    >
                      {oConfirmacion.nombreInvitado}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {oConfirmacion.numeroInvitados}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    {getStatusLabel(oConfirmacion.asistencia)}
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {moment.unix(oConfirmacion.createdAt.seconds).format("DD-MMM-yyyy hh:mm a")}
                    </Typography>
                  </TableCell>
                 <TableCell align='center'>
                    <Tooltip disableTouchListener disableFocusListener title="Edit Jugador" arrow={true}>
                      <IconButton
                        onClick={()=>{ handleClickOpen('edit',oConfirmacion)}}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip disableTouchListener disableFocusListener title="Delete Jugador" arrow={true}>
                      <span>
                      <IconButton
                        onClick={()=>{ handleClickOpen('delete',oConfirmacion)}}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    <DeleteDialog open={open} onClose={()=>{handleClose('delete')}} confirmacion={confirmacionEdit}/>
    <EditDialog open={openEdit} onClose={()=>{handleClose('edit')}} confirmacion={confirmacionEdit} setConfirmacionEdit={setConfirmacionEdit}/>
    <CreateLinkDialog open={openCreate} onClose={()=>{handleClose('create')}} confirmacion={confirmacionEdit} token={token}/>
    </>
  );
};

BaseTable.propTypes = {
  confirmaciones: PropTypes.array.isRequired
};

BaseTable.defaultProps = {
  confirmaciones: []
};

export default BaseTable;
// {/* {format(jugadorArray.createdAt, 'MMMM dd yyyy')} */}