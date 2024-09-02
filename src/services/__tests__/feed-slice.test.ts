import { expect, describe, jest } from '@jest/globals';
import store from '../store';
import { fetchFeed } from '../slices/assync-thunk/feed';
import { feedMock } from '../mocks/mock-data';
import {
  getAllOrders,
  getFeed,
  getFeedError,
  isFeedLoading
} from '../slices/feed-slice';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('tests for feed slice', () => {
  const loading = () => isFeedLoading(store.getState());
  const error = () => getFeedError(store.getState());
  const feed = () => getFeed(store.getState());
  const allOrders = () => getAllOrders(store.getState());

  it('assyncThunk FAILED test', async () => {
    const failed = {
      type: fetchFeed.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);

    expect(allOrders()).toEqual([]);
    expect(feed()).toBeNull();
    expect(loading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('assyncThunk REQUEST test', async () => {
    const request = { type: fetchFeed.pending.type };

    store.dispatch(request);

    expect(allOrders()).toEqual([]);
    expect(feed()).toBeNull();
    expect(loading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('assyncThunk SUCCESS test', async () => {
    const success = {
      type: fetchFeed.fulfilled.type,
      payload: feedMock
    };

    await store.dispatch(success);

    expect(allOrders()).toEqual(feedMock.orders);
    expect(feed()).toEqual(feedMock);
    expect(loading()).toBe(false);
    expect(error()).toBe(null);
  });
});
