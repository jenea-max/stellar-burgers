import { combineReducers } from 'redux';
import { ordersSlice } from './selector/slices/orders-slice/orders-slice';
import { constructorSlice } from './selector/slices/constructor-slice/constructor-slice';
import { ingredientsSlice } from './selector/slices/ingredients-slice/ingredients-slice';
import { feedSlice } from './selector/slices/feed-slice/feed-slice';
import { orderSlice } from './selector/slices/order-slice/order-slice';
import { userSlice } from './selector/slices/user-slice/user-slice';

export const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer
});
