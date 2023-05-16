import React, { useEffect, useState } from 'react';
import {Box, Container,Paper,Typography} from '@mui/material';
import { selectAllConfirmaciones } from '../../../store/confirmaciones/confirmacion.selector';

import { useSelector } from 'react-redux';
import TablaConfirmaciones from './confirmaciones-tabla';
import { ConfirmacionesArray } from './confirmaciones-tabla/confirmaciones_types';

const Confirmaciones = () => {
  const allConfirmaciones: ConfirmacionesArray[] = useSelector(selectAllConfirmaciones);
  const [state, setState ] = useState({
    numeroAsistentes:0, 
    numeroNoAsistentes: 0, 
    numeroTalvez:0
  });

  useEffect(() => {
    calcularInvitados();
  }, [allConfirmaciones]);
  
  const calcularInvitados = () => {
    let nAsistentes = state.numeroAsistentes;
    let nNoAsistentes = state.numeroNoAsistentes;
    let nTalvez = state.numeroTalvez;
    
    allConfirmaciones.forEach( (oInvitado: any) => {
      if(oInvitado.asistencia === "SI"){
        nAsistentes = nAsistentes + oInvitado.numeroInvitados;
      } else if (oInvitado.asistencia === "NO"){
        nNoAsistentes = nNoAsistentes + oInvitado.numeroInvitados;
      } else if (oInvitado.asistencia === "TALVEZ"){
        nTalvez = nTalvez + oInvitado.numeroInvitados;
      }
    })
    setState({
      numeroAsistentes: nAsistentes,
      numeroNoAsistentes: nNoAsistentes,
      numeroTalvez: nTalvez
    })

  }
  return (
    <React.Fragment>
      {/* <Container> */}
       
        <Box
        sx={{
          margin:'10px 0px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 110,
            height: 60,
          },
        }}
      >
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize:'0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          Asistiran
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {state.numeroAsistentes}
        </Typography>
          </Paper>
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize:'0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          No Asistiran
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {state.numeroNoAsistentes}
        </Typography>
        </Paper>
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize:'0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          Tal vez
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {state.numeroTalvez}
        </Typography>
        </Paper>
      </Box>
      <TablaConfirmaciones/>
    {/* </Container> */}
      
    </React.Fragment>
        
  );
}

  
export default Confirmaciones;