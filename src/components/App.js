
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

import ErrorPage from "./error-page";

import Login from "./login/login.component";
import Confirmacion from "./confirmacionForm/confirmacion.form.component";

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
    // dispatch(loadingSuccess());
  }, []);

  return (
      <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline />
      <Fragment>
      <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path='/' element={<Login/>}/>
      <Route path='/invitacion/:token/confirmacion/:numeroInvitados' element={<Confirmacion/>}/>
      </Routes>
      </Fragment>
      </LocalizationProvider>
      </ThemeProvider>
    )
}


export default App;
