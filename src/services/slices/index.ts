import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import ingredientSlice from './ingredient-slice';
import feedSlice from './feed-slice';
import constructorSlice from './constructor-slice';
import userOrderSlice from './user-order-slice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientSlice.name]: ingredientSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userOrderSlice.name]: userOrderSlice.reducer
});

export default rootReducer;
