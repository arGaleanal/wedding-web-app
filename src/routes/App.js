
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from '../logo.svg';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector } from 'react-redux';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import 'moment/locale/fr';


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import useMediaQuery from '@mui/material/useMediaQuery';
import ThemeProvider from '../theme/ThemeProvider';
import Loading from '../components/loading/loading.component';

import ErrorPage from "../components/error-page";

import SignInForm from "./login/login.component";
import Confirmacion from "./confirmacion/confirmacion.component";
import AdminLayout from './admin';
import PanelInicio from './admin/inicio';
import Confirmaciones from './admin/confirmaciones';
import { getConfirmacionesStart } from '../store/confirmaciones/confirmacion.action';
import { checkUserSession } from '../store/user/user.action';
import {
  loadingSuccess,
} from '../store/loading/loading.action';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
// ]);

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadingSuccess());
    if(window.location.pathname !== "/recover_password"){
      dispatch(checkUserSession());
    }
  }, []);

  return (
      <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline />
      <Fragment>
      <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path='/login' element={<SignInForm/>}/>
      <Route path='/invitacion/:token/confirmacion/:nInvitados' element={<Confirmacion/>}/>
      <Route path='admin/*' element={<AdminLayout/>}>
        <Route index element={<PanelInicio />} />
        <Route path='confirmaciones' element={<Confirmaciones />} />
        <Route path='invitaciones' element={<ErrorPage />} />
        <Route path='algomas' element={<ErrorPage />} />
      </Route>
      </Routes>
      <Loading/>  
      </Fragment>
      </LocalizationProvider>
      </ThemeProvider>
    )
}


export default App;
