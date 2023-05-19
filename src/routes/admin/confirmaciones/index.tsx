import React, { useEffect, useState } from 'react';
import {Box, Container,Paper,Typography} from '@mui/material';
import { selectAllConfirmaciones } from '../../../store/confirmaciones/confirmacion.selector';

import { useSelector } from 'react-redux';
import TablaConfirmaciones from './confirmaciones-tabla';
import { ConfirmacionesArray } from './confirmaciones-tabla/confirmaciones_types';

const Confirmaciones = () => {
  const allConfirmaciones: ConfirmacionesArray[] = useSelector(selectAllConfirmaciones);
  const [sumSiAsistiran, setSumSiAsistiran] = useState(0);
  const [sumNoAsistiran, setSumNoAsistiran] = useState(0);
  const [sumTalvezAsistiran, setSumTalvezAsistiran] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    let sumSi = 0;
    let sumNo = 0;
    let sumTalvez = 0;

    allConfirmaciones.forEach((confirmation) => {
      if (confirmation.asistencia === 'SI') {
        sumSi += confirmation.numeroInvitados;
      } else if (confirmation.asistencia === 'NO') {
        sumNo += confirmation.numeroInvitados;
      } else if (confirmation.asistencia === 'TALVEZ') {
        sumTalvez += confirmation.numeroInvitados;
      }
    });
    setSumSiAsistiran(sumSi);
    setSumNoAsistiran(sumNo);
    setSumTalvezAsistiran(sumTalvez);
  }, [allConfirmaciones]);
  
  // const calcularInvitados = () => {
  //   let nAsistentes = state.numeroAsistentes;
  //   let nNoAsistentes = state.numeroNoAsistentes;
  //   let nTalvez = state.numeroTalvez;
    
  //   allConfirmaciones.map( (oInvitado: any) => {
  //     if(oInvitado.asistencia === "SI"){
  //       nAsistentes = nAsistentes + oInvitado.numeroInvitados;
  //     } else if (oInvitado.asistencia === "NO"){
  //       nNoAsistentes = nNoAsistentes + oInvitado.numeroInvitados;
  //     } else if (oInvitado.asistencia === "TALVEZ"){
  //       nTalvez = nTalvez + oInvitado.numeroInvitados;
  //     }
  //   })
  //   setState({
  //     numeroAsistentes: nAsistentes,
  //     numeroNoAsistentes: nNoAsistentes,
  //     numeroTalvez: nTalvez
  //   });
  // }
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
            mr: isMobile ? 0.5 : 1 ,
            ml: isMobile ? 0.5 : 1 ,
            width: isMobile ? 108 : 110,
            height: 60,

          },
        }}
      >
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize: isMobile ? '' : '0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          Asistiran
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {sumSiAsistiran}
        </Typography>
          </Paper>
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize: isMobile ? '' : '0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          No Asistiran
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {sumNoAsistiran}
        </Typography>
        </Paper>
        <Paper>
        <Typography component="h6" variant="overline" color="primary" align="center" sx={{fontSize: isMobile ? '' : '0.75rem',fontWeight:'normal', maxHeight:'25px'}}>
          Tal vez
        </Typography>
        <Typography variant="overline" color="primary" align="center" style={{marginBottom:5,fontWeight: 'bolder', display: 'flex', justifyContent: 'center', maxHeight:'30px'}}>
          {sumTalvezAsistiran}
        </Typography>
        </Paper>
      </Box>
      <TablaConfirmaciones/>
    {/* </Container> */}
      
    </React.Fragment>
        
  );
}

  
export default Confirmaciones;