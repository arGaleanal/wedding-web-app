import { Grid, Container, Tabs, Tab, Box, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { ConfirmacionesArray } from './confirmaciones_types';
import BaseTable from './tabla';
import { FC, SyntheticEvent, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllConfirmaciones } from '../../../../store/confirmaciones/confirmacion.selector';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SectionConfirmaciones = (props:{ confirmaciones:ConfirmacionesArray[];}) => {
  const {confirmaciones} = props;
  return (
    <Card>
        <BaseTable confirmaciones={confirmaciones}/>
    </Card>
  );
}

const TablaConfirmaciones = () => {
    const confirmaciones: ConfirmacionesArray[] = useSelector(selectAllConfirmaciones);
    const { t, i18n } = useTranslation();
    
  // const jugadoresFiltered = applyFilters(jugadores,filtroSelected)
  return (
    <>
      {/* <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          spacing={3}
        >
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Container> */}
      <SectionConfirmaciones confirmaciones={confirmaciones}/>
    </>
  );
}

export default TablaConfirmaciones;
