import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  ListItemButton,
  useTheme,
  lighten
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance, subDays } from 'date-fns';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { updateNotificacionStart } from '../../../../store/notificaciones/notificacion.action';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.5)};
        color: ${theme.colors.alpha.white[100]};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);
const NotificationsBadge2 = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.colors.primary.main, 0.5)};
        color: ${theme.colors.alpha.white[100]};
        min-width: 12px; 
        height: 12px;
        padding: 0;
        top: -1px;
        right: -10px;
        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.colors.primary.main, 0.3)};
            content: "";
        }
    }
`
);
function HeaderNotifications( props : { notificaciones: any }) {
  const { notificaciones } = props;
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const [aNotificaciones, setNotificaciones] = useState<any[]>([])
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    revisarNotificaciones(notificaciones);
  }, [notificaciones]);

  const revisarNotificaciones = (notificaciones: any) => {
    const filteredArray = _.filter(notificaciones,(item) => item.leida === false);
    console.log('here',filteredArray)
    setNotificaciones(filteredArray);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    //const filteredArray = _.filter(aNotificaciones,(item) => item.leida === false);
    //setNotificaciones(filteredArray);
    setOpen(false);
  };

  const changeNotificacionRead = (notificacion: any) => {
    if (notificacion.leida) return;
    const updatedData = aNotificaciones.map((item:any) => {
      if (item.id === notificacion.id) {
        dispatch(updateNotificacionStart({ ...item, leida: true }))
        return { ...item, leida: true };
      } else {
        return item;
      }
    });
    setNotificaciones(updatedData);
  };

  const handleNotificationHover = (notificacion: any) => {
    if (notificacion.leida) return;
    setNotificaciones((prevNotifications) =>
      prevNotifications.map((item) => {
        dispatch(updateNotificacionStart({ ...item, leida: true }))
        return item.id === notificacion.id ? { ...item, leida: true } : item
      }
      )
    );

    setTimeout(() => {
      setNotificaciones((prevNotifications) =>
        prevNotifications.filter((item) => item.id !== notificacion.id)
      );
      
    }, 2500);
  };

  moment.locale(`${i18n.resolvedLanguage}`);
  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="secondary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={aNotificaciones.length}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
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
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">{t('notificaciones.notificacionLabel')}</Typography>
        </Box>
        <Divider />

        {notificaciones.length === 0 ? 
        <Box flex="1" sx={{ p: '16px',justifyContent: 'center', minWidth: 350, display: { xs: 'block', sm: 'flex' }}}>
          <Typography variant="caption">{t('notificaciones.noNotificacionLabel')}</Typography>
        </Box>
        :
        <List sx={{ p: 0 }}>
          {
            notificaciones.map((notificacion:any, index: number) => {
            return(
              <ListItem key={index}
                //onClick={() => { changeNotificacionRead(notificacion)}}             
                sx={{ p: '5px', minWidth: 350, display: { xs: 'block', sm: 'flex' }}}
              >
                <ListItemButton onMouseEnter={() => handleNotificationHover(notificacion)}>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 'bold'}}>
                      {notificacion.nombreInvitado}
                    </Typography>
                    { notificacion.leida === false ? 
                    <NotificationsBadge2
                        badgeContent={''}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                      >
                    <Typography variant="caption" sx={{ textTransform: 'none' }} color={"text.secondary"}>
                      {moment(moment.unix(notificacion.createdAt.seconds), "DDMMYYYY").fromNow()}
                    </Typography>
                    </NotificationsBadge2>
                    :
                    <Typography variant="caption" sx={{ textTransform: 'none' }} color={"text.secondary"}>
                      {moment(moment.unix(notificacion.createdAt.seconds), "DDMMYYYY").fromNow()}
                    </Typography>
                    }
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    color={"text.secondary"}
                    //sx={{fontWeight: notificacion.leida === false ? 'bold' : 'initial'}}
                  >
                    {' '}
                    {t('notificaciones.confirmacionLabel')}
                  </Typography>
                </Box>
                </ListItemButton>
              </ListItem>

            )
            })
          }
        </List>}
      </Popover>
    </>
  );
}

export default HeaderNotifications;
