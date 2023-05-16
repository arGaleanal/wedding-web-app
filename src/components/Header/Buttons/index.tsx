import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';

function HeaderButtons( props : { notificaciones: any }) {
  const { notificaciones } = props;
  return (
    <Box sx={{ mr: 1 }}>
      {/* {<HeaderSearch />} */}
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications notificaciones={notificaciones}/>
      </Box>
    </Box>
  );
}

export default HeaderButtons;
