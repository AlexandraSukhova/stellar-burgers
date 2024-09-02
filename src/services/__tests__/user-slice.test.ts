import { userMock } from '../mocks/mock-data';
import {
  fetchGetApi,
  fetchUpdateApi,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegister
} from '../slices/assync-thunk/user';
import {
  getAuthChecked,
  getAuthenticated,
  getUser,
  getUserError,
  isInit
} from '../slices/user-slice';
import store from '../store';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('tests for user slice', () => {
  const authChecked = () => getAuthChecked(store.getState());
  const error = () => getUserError(store.getState());
  const user = () => getUser(store.getState());
  const authenticated = () => getAuthenticated(store.getState());
  const init = () => isInit(store.getState());

  it('assyncThunk FAILED tests', async () => {
    const failedRegister = {
      type: fetchUserRegister.rejected.type,
      error: '404 not found'
    };

    const failedLogin = {
      type: fetchUserLogin.rejected.type,
      error: '404 not found'
    };

    const failedGetApi = {
      type: fetchGetApi.rejected.type,
      error: '404 not found'
    };

    const failedUpdateApi = {
      type: fetchUpdateApi.rejected.type,
      error: '404 not found'
    };

    const failedLogout = {
      type: fetchUserLogout.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedRegister);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(authenticated()).toBe(false);
    expect(user()).toBeNull();

    await store.dispatch(failedLogin);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(authenticated()).toBe(false);
    expect(user()).toBeNull();

    await store.dispatch(failedGetApi);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(authenticated()).toBe(false);
    expect(user()).toBeNull();

    await store.dispatch(failedUpdateApi);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(authenticated()).toBe(true);

    await store.dispatch(failedLogout);
    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(authenticated()).toBe(true);
  });

  it('assyncThunk REQUEST tests', async () => {
    const requestRegister = { type: fetchUserRegister.pending.type };

    const requestLogin = {
      type: fetchUserLogin.pending.type
    };

    const requestGetApi = {
      type: fetchGetApi.pending.type
    };

    const requestUpdateApi = {
      type: fetchUpdateApi.pending.type
    };

    const requestLogout = {
      type: fetchUserLogout.pending.type
    };

    store.dispatch(requestRegister);

    expect(authChecked()).toBe(false);
    expect(authenticated()).toBe(false);
    expect(init()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    store.dispatch(requestLogin);

    expect(authChecked()).toBe(false);
    expect(authenticated()).toBe(false);
    expect(init()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    store.dispatch(requestGetApi);

    expect(authChecked()).toBe(false);
    expect(authenticated()).toBe(false);
    expect(init()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    store.dispatch(requestUpdateApi);

    expect(init()).toBe(true);
    expect(error()).toBeNull;

    store.dispatch(requestLogout);

    expect(authChecked()).toBe(false);
    expect(authenticated()).toBe(true);
    expect(init()).toBe(true);
    expect(error()).toBeNull;
  });

  it('assyncThunk SUCCESS tests', async () => {
    const successRegister = {
      type: fetchUserRegister.fulfilled.type,
      payload: { user: userMock }
    };

    const successLogin = {
      type: fetchUserLogin.fulfilled.type,
      payload: userMock
    };

    const successGetApi = {
      type: fetchGetApi.fulfilled.type,
      payload: { user: userMock }
    };

    const successUpdateApi = {
      type: fetchUpdateApi.fulfilled.type,
      payload: { user: userMock }
    };

    const successLogout = {
      type: fetchUserLogout.fulfilled.type
    };

    await store.dispatch(successRegister);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBeNull;
    expect(authenticated()).toBe(true);
    expect(user()).toEqual(userMock);

    await store.dispatch(successLogin);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBeNull;
    expect(authenticated()).toBe(true);
    expect(user()).toEqual(userMock);

    await store.dispatch(successGetApi);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBeNull;
    expect(authenticated()).toBe(true);
    expect(user()).toEqual(userMock);

    await store.dispatch(successUpdateApi);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBeNull;
    expect(authenticated()).toBe(true);
    expect(user()).toEqual(userMock);

    await store.dispatch(successLogout);

    expect(authChecked()).toBe(true);
    expect(init()).toBe(false);
    expect(error()).toBeNull;
    expect(authenticated()).toBe(false);
    expect(user()).toBeNull();
  });
});
