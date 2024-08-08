import { getFeedsApi } from '@api';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);

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
  name: 'feed',
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
  }
});

export default feedSlice.reducer;
