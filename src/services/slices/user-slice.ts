import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

import { USER_SLICE_NAME } from '../../utils/constants';
import {
  fetchGetApi,
  fetchUpdateApi,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegister
} from './assync-thunk/user';

export interface IUserSlice {
  user: TUser | null;
  isAuthChecked: boolean; //была ли проверка на авторизацию
  isAuthenticated: boolean; //пользователь прошел/не прошел авторизацию
  init: boolean; //старт проверки
  error: SerializedError | null;
}

export const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  init: false,
  error: null
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.init = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.init = true;
        state.error = null;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.init = true;
        state.error = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.init = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchGetApi.pending, (state) => {
        state.init = true;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchGetApi.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.init = false;
        state.user = null;
        state.error = action.error;
      })
      .addCase(fetchGetApi.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.init = false;
        state.error = null;
      })
      .addCase(fetchUpdateApi.pending, (state) => {
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUpdateApi.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
        state.isAuthenticated = true;
      })
      .addCase(fetchUpdateApi.fulfilled, (state, action) => {
        state.init = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.init = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.init = false;
        state.error = null;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getAuthenticated: (state) => state.isAuthenticated,
    getUserError: (state) => state.error,
    isInit: (state) => state.init
  }
});

export const {
  getUser,
  getAuthChecked,
  getAuthenticated,
  getUserError,
  isInit
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
export default userSlice;
