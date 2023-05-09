import * as React from 'react';
import Stack from '@mui/material/Stack';
import {Snackbar, SnackbarOrigin} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState, SyntheticEvent,MouseEvent,ChangeEvent, Fragment, useEffect, useMemo } from 'react';

const Alert = React.forwardRef(function Alert(props:any, ref:any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Alerts = (props :{ open: boolean, handleClose: any, message: string, type: string}) => {
  const { open, handleClose, message, type } = props;
  
  const [state, setState] = useState<SnackbarOrigin>({
    vertical: 'top',
    horizontal: 'right',
    });
      
  const { vertical, horizontal } = state;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default Alerts;
