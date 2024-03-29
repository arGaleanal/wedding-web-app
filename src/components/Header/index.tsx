import { useContext } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Typography
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import HeaderMenu from './Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector } from 'react-redux';
import { selectAllConfirmaciones } from '../../store/confirmaciones/confirmacion.selector';
import { selectNotificacionesConfirmaciones } from '../../store/notificaciones/notificacion.selector';

// background-color: ${alpha(theme.colors.primary.main, 0.95)};
const HeaderWrapper = styled(Box)(
  ({ theme }) => ({
    height:theme.header.height,
    color: theme.header.textColor,
    padding: theme.spacing(0, 2),
    right: 0,
    zIndex: 6,
    backgroundColor: '#F5F4F2',
    backdropFilter: 'blur(3px)',
    position: 'static',
    minHeight: '79px',
    justifycontent: 'space-between',
    width: '100%',
    [ `@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
      left: theme.sidebar.width,
      width: 'auto',
    },
    ...( theme.palette.mode === "dark" && {
      backgroundColor: '#3e3a38'
    }),

})
);
const logoImage = require('../../utils/images/wedding-app.png');
const Header = () => {
  // const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const notificaciones = useSelector(selectNotificacionesConfirmaciones);
  const confirmaciones = useSelector(selectAllConfirmaciones);

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} /> */}
      <img src={logoImage} style={{width:'45px', height:'45px'}}/>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        color={"primary"}
        sx={{
          mr: 2,
          ml: 2,
          display: { xs: 'none', md: 'flex' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          textDecoration: 'none'
        }}
      >
        Wedding App
      </Typography>
      <Stack
        direction="row"
        sx={{display:'flex',flexGrow:1}}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        {/* {<HeaderMenu />} */}
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons notificaciones={notificaciones}/>
        <HeaderUserbox />
        {/* <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary">
                <MenuTwoToneIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box> */}
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
