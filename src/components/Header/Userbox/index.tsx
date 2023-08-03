import { useRef, useState } from 'react';


import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { selectCurrentUser } from '../../../store/user/user.selector';
import { signOutStart } from '../../../store/user/user.action';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

const UserBoxButton = styled(Button)(
  ({ theme }) => ({
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        ...( theme.palette.mode === "dark" && {
          color: '#CBCCD2'
        }),
  })
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    display: 'block',
    ...( theme.palette.mode === "dark" && {
      color: '#CBCCD2'
    }),
  })    
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.primary.light}
`
);
//lighten(theme.palette.secondary.main, 0.8)
function HeaderUserbox() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  // const signOutUser = () => dispatch(signOutStart());
  const signOutUser = () => {
    dispatch(signOutStart());
    navigate('/login');
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={currentUser.displayName} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{currentUser.displayName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {currentUser.admin ?  t('profileMenu.profile.adminLabel') : ''}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} color="primary" />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={currentUser.displayName} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{currentUser.displayName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {currentUser.admin ?  t('profileMenu.profile.adminLabel') : t('profileMenu.profile.userLabel')}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button onClick={()=>{}} disabled>
            <AccountBoxTwoToneIcon fontSize="medium" />
            <ListItemText primary="My Profile" />
          </ListItem>
          {/* {<ListItem button to="/dashboards/messenger" component={NavLink}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>} */}
          <ListItem button onClick={()=>{}} disabled>
            <SettingsApplicationsIcon fontSize="medium" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={signOutUser}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
