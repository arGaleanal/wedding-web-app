import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { loadingReducer } from './loading/loading.reducer';
// import { equiposReducer } from './equipo/equipo.reducer';
// import { jugadoresReducer } from './jugador/jugador.reducer';
// import { matchReducer } from './match/match.reducer';
import { utilsReducer } from './utils/utils.reducer';

//import { categoriesReducer } from './categories/category.reducer';
//import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  utils: utilsReducer
});
