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
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.init = true;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.init = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchGetApi.pending, (state) => {
        state.init = true;
      })
      .addCase(fetchGetApi.rejected, (state) => {
        state.isAuthenticated = false;
        state.init = false;
      })
      .addCase(fetchGetApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateApi.pending, (state) => {
        state.init = true;
      })
      .addCase(fetchUpdateApi.rejected, (state) => {
        state.isAuthenticated = false;
        state.init = false;
      })
      .addCase(fetchUpdateApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.init = true;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.init = false;
        state.error = action.error;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getAuthenticated: (state) => state.isAuthenticated,
    getError: (state) => state.error,
    isInit: (state) => state.init
  }
});

export const { getUser, getAuthChecked, getAuthenticated, getError, isInit } =
  userSlice.selectors;
export const { authChecked } = userSlice.actions;
export default userSlice;
