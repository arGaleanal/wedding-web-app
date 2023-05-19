
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { useNavigate, Outlet } from 'react-router-dom';

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
import { setNoticacionConfirmacionStart, getNotificacionesStart} from '../store/notificaciones/notificacion.action';
import { checkUserSession } from '../store/user/user.action';
import {
  loadingSuccess,
} from '../store/loading/loading.action';
import { useAuth, db } from '../utils/firebase/firebase.utils';
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { selectCurrentUser } from '../store/user/user.selector';
import { getConfirmacionesStart } from '../store/confirmaciones/confirmacion.action';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
// ]);

const PrivateRoute2 = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
const PrivateAdminRoute = ( { children }) => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser.admin ? children : <Navigate to="/login" replace={true}/>;
}

const PrivateRoute = ( { children }) => {
  const auth = useAuth();
  const currentUser = useSelector(selectCurrentUser);
  // console.log('PrivateRoute ;auth',auth);
  // console.log('PrivateRoute ;currentUser',currentUser);

  return currentUser.id ? children : <Navigate to="/login" replace={true}/>;
}

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

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

  useEffect(() => {
    const q = query(collection(db, "notificaciones"),orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q,{ metadataChanges: 'hasPendingWrites' }, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New notificaciones: ", change.doc.data());
            //dispatch(setNoticacionConfirmacionStart({id: change.doc.id,...change.doc.data()}))
            dispatch(getNotificacionesStart());
            dispatch(getConfirmacionesStart());
        }
        if (change.type === "modified") {
            console.log("Modified notificaciones: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed notificaciones: ", change.doc.data());
        }
      });
    });
    // Devuelve una función de limpieza para detener la escucha de cambios
    return () => unsubscribe();
  }, []);

  
  return (
      <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <CssBaseline />
      <Fragment>
      <Routes>
      <Route index element={<Navigate to="/login" replace />}/>
      <Route path="*" element={<ErrorPage />} />
      <Route path='/login' element={<SignInForm/>}/>
      <Route path='/invitacion/:token/confirmacion/:nInvitados' element={<Confirmacion/>}/>
      <Route path="admin/*" element={<PrivateRoute><AdminLayout/></PrivateRoute>}>
        <Route index element={<PanelInicio />} />
        <Route path='confirmaciones' element={<Confirmaciones />} />
        <Route path='invitaciones' element={<ErrorPage />} />
        <Route path='algomas' element={<ErrorPage />} />
      </Route>
      {/* <Route path='admin/*' element={<AdminLayout/>}>
        <Route index element={<PanelInicio />} />
        <Route path='confirmaciones' element={<Confirmaciones />} />
        <Route path='invitaciones' element={<ErrorPage />} />
        <Route path='algomas' element={<ErrorPage />} />
      </Route> */}
      </Routes>
      <Loading/>  
      </Fragment>
      </LocalizationProvider>
      </ThemeProvider>
    )
}


export default App;
