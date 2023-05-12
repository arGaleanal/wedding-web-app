import React from 'react';
import {Container,Typography} from '@mui/material';
import { selectAllConfirmaciones } from '../../../store/confirmaciones/confirmacion.selector';

import { useSelector } from 'react-redux';
import TablaConfirmaciones from './jugadores-tabla';

const Confirmaciones = () => {
  const allConfirmaciones = useSelector(selectAllConfirmaciones);

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h3" style={{padding:'15px'}} gutterBottom component="div" color="primary" align="center">
        </Typography>
      <TablaConfirmaciones/>
    </Container>
      
    </React.Fragment>
        
  );
}

  
export default Confirmaciones;