import {
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const fetchUserRegister = createAsyncThunk(
  'user/registr',
  registerUserApi
);

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchUserLogout = createAsyncThunk('user/logout', () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const fetchGetApi = createAsyncThunk('user/getApi', getUserApi);

export const fetchUpdateApi = createAsyncThunk('user/updateApi', updateUserApi);

export interface IUserSlice {
  user: TUser | null;
  password: string;
  isAuthChecked: boolean; //была ли проверка на авторизацию
  isAuthenticated: boolean; //пользователь прошел/не прошел авторизацию
  init: boolean; //старт проверки
  error: SerializedError | null;
}

export const initialState: IUserSlice = {
  user: null,
  password: '',
  isAuthChecked: false,
  isAuthenticated: false,
  init: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    savePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
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
  }
});

export const { authChecked, savePassword } = userSlice.actions;
export default userSlice.reducer;
