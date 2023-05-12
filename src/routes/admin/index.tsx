import { FC, useState, ReactNode, useEffect, Fragment } from 'react';
import { Box, alpha, lighten, useTheme, Container, Fab, Fade,Typography, AppBar, Toolbar,CssBaseline,useScrollTrigger, Tabs, Tab, styled } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { selectAdminTab } from '../../store/utils/utils.selector';
import { setAdminTab } from '../../store/utils/utils.action';

// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import SidebarMenu from './SidebarMenu';
import * as React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ResponsiveAppBar from './appbar';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GroupAddIcon from '@mui/icons-material/People';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getConfirmacionesStart } from '../../store/confirmaciones/confirmacion.action';
import Header from '../../components/Header';

interface StyledTabProps {
    label: string;
    icon: any;
}
const AntTabs = styled(Tabs)(({theme}) =>
({
    // borderBottom: '1px solid #e8e8e8',
    minHeight: 80,
    backgroundColor: theme.colors.secondary.main,
    '& .MuiTabs-indicator': {
      borderRadius: 0,
      boxShadow: 'none',
      background: 'none',
      border: 'none',
      borderBottom: `5px solid ${theme.colors.primary.main}`,
    },
  })
);
  
const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      height:'auto',
      padding: '12px 16px',
      color: theme.colors.primary.main,
      '&:hover': {
        color: '#fff',
        opacity: 1,
      },
      '&.Mui-selected': {
        color: theme.colors.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
      },
    }),
  );
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function BackToTop(props: Props) {
  const adminTab = useSelector(selectAdminTab);
  const [value, setValue] = useState(adminTab);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfirmacionesStart());
  }, []);
  
  useEffect(() => {
    let routName = window.location.pathname;
    console.log('routName',routName);
    if (routName === '/admin') {
        setValue('');
        dispatch(setAdminTab(''));
    } else if (routName === '/confirmaciones') {
        setValue(0);
        dispatch(setAdminTab(0));
    } else if (routName === '/invitaciones') {
        setValue(1);
        dispatch(setAdminTab(1));
    } else if (routName === '/algomas') {
        setValue(2);
        dispatch(setAdminTab(2));
    }
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    console.log('here',newValue)
    if( newValue === 0 ){
        navigate('confirmaciones');
    } else if ( newValue === 1 ) {
        navigate('invitaciones');
    }
    setValue(newValue);
    dispatch(setAdminTab(newValue));
  };
  return (
    <React.Fragment>
      <Header/>
      {/* <ResponsiveAppBar/> */}
      <Box>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab icon={<PhoneIphoneIcon />} label="Confirmaciones"/>
          <AntTab icon={<LocalPostOfficeIcon />} label="Invitaciones" />
          <AntTab icon={<GroupAddIcon />} label="Algo mas" />
        </AntTabs>
      </Box>
      {/* <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Scroll to see button
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Toolbar id="back-to-top-anchor" />
      <Container component="main" maxWidth="lg">
        <Box display="block">
            <Outlet />
        </Box>
      </Container>
      {/* <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
    </React.Fragment>
  );
}
