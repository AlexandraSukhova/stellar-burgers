import { expect, describe, jest } from '@jest/globals';
import store from '../store';
import { fetchUserOrders } from '../slices/assync-thunk/user-oreders';
import { userOrdersMock } from '../mocks/mock-data';
import {
  getUserOrders,
  getUserOrdersError,
  isUserOrdersLoading
} from '../slices/user-order-slice';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('tests for user orders slice', () => {
  const loading = () => isUserOrdersLoading(store.getState());
  const error = () => getUserOrdersError(store.getState());
  const userOrders = () => getUserOrders(store.getState());

  it('assyncThunk FAILED test', async () => {
    const failed = {
      type: fetchUserOrders.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);

    expect(userOrders()).toEqual([]);
    expect(loading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('assyncThunk REQUEST test', async () => {
    const request = { type: fetchUserOrders.pending.type };

    store.dispatch(request);

    expect(userOrders()).toEqual([]);
    expect(loading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('assyncThunk SUCCESS test', async () => {
    const success = {
      type: fetchUserOrders.fulfilled.type,
      payload: userOrdersMock
    };

    await store.dispatch(success);

    expect(userOrders()).toEqual(userOrdersMock);
    expect(loading()).toBe(false);
    expect(error()).toBe(null);
  });
});
