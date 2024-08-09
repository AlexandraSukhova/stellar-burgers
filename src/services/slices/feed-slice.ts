import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { FEED_SLICE_NAME } from '../../utils/constants';
import { fetchFeed } from './assync-thunk/feed';

export interface IFeedSlice {
  feed: TOrdersData | null;
  orders: TOrder[];
  error: SerializedError | null;
  loading: boolean;
}

export const initialState: IFeedSlice = {
  feed: null,
  orders: [],
  error: null,
  loading: false
};

const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.orders = action.payload.orders;
          state.loading = false;
        }
      )
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getAllOrders: (state) => state.orders,
    isLoading: (state) => state.loading,
    getFeedError: (state) => state.error
  }
});

export const { getFeed, getAllOrders, isLoading, getFeedError } =
  feedSlice.selectors;
export default feedSlice;
