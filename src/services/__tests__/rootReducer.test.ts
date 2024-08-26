import rootReducer from '@slices';
import store from '../store';

describe('test for root reducer', () => {
  test('should return initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(store.getState());
  });
});
