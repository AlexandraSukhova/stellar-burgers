import { getOrderByNumberApi, getOrdersApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchUserOrders = createAsyncThunk('user/orders', getOrdersApi);

export interface IUserOrder {
  orders: TOrder[];
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IUserOrder = {
  orders: [],
  loading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'user/orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export default userOrdersSlice.reducer;
