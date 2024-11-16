import { combineReducers } from 'redux';
import { constructorSlice } from './selector/slices/constructor-slice/constructor-slice';
import { feedSlice } from './selector/slices/feed-slice/feed-slice';
import { ingredientsSlice } from './selector/slices/ingredients-slice/ingredients-slice';
import { ordersSlice } from './selector/slices/orders-slice/orders-slice';
import { userSlice } from './selector/slices/user-slice/user-slice';
import { orderSlice } from './selector/slices/order-slice/order-slice';

export const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userSlice.name]: userSlice.reducer
});
