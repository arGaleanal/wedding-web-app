import React from 'react';
import {Container,Typography} from '@mui/material';

  
const PanelInicio = () => {
    
  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <div className=''>
        <Typography variant="h3" style={{padding:'108px'}} gutterBottom component="div" color="primary" align="center">
            Bienvenido admin!!!
        </Typography>
      </div>
    </Container>
      
    </React.Fragment>
        
  );
}

  
export default PanelInicio;
