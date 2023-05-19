import { useRouteError } from "react-router-dom";
import { useEffect, useState } from 'react';
import { 
  Paper,
  Container,
  Typography,
  Box,
  CssBaseline,
  Avatar,
  useTheme
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setIsTablet(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches);
  }, []);

  return (
    <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper  
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isMobile ? '10px 9px' : '10px 20px',
            paddingBottom: '50px',
            marginLeft: isMobile ? '0px' : '60px',
            marginRight: isMobile ? '0px' :'60px',
            background: 'none',
            boxShadow: 'none',
            border: 'none'
          }}
        >
        <Avatar sx={{ mt: 4, background: 'none', width: 65, height: 65 }}>
            <ErrorOutlineIcon sx={{color:`${theme.colors.error.main}`,fontSize: '70px'}}/>
          </Avatar>
          <Box sx={{ mt: 2 }}>
              <Box sx={{ p: 3}}>
              <Typography variant="h1" color="black.main" align='center' gutterBottom >
                {t('errorPage.title')}
              </Typography>
              <Typography variant="subtitle1" color="default" align='center' gutterBottom>
                {t('errorPage.subtitle')}
              </Typography>
              </Box>
          </Box>
          </Paper>
    </Container>
    // <div id="error-page">
    //   <h1 >404 Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     {/* <i>{error.statusText || error.message}</i> */}
    //   </p>
    // </div>
  );
}