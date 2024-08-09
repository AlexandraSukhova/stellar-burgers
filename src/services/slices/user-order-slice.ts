import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { USER_ORDER_SLICE_NAME } from '../../utils/constants';
import { fetchUserOrders } from './assync-thunk/user-oreders';

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
  name: USER_ORDER_SLICE_NAME,
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
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    isUserOrdersLoading: (state) => state.loading,
    getUserOrdersError: (state) => state.error
  }
});

export const { getUserOrders, getUserOrdersError, isUserOrdersLoading } =
  userOrdersSlice.selectors;
export default userOrdersSlice;
