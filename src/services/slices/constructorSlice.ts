import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngridients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

interface IConstructorSlice {
  isIngredientsLoading: boolean;
  allIngridients: TIngredient[];
  error: 'string' | undefined;
}

const initialState: IConstructorSlice = {
  isIngredientsLoading: false,
  allIngridients: [],
  error: undefined
};

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngridients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.allIngridients = action.payload;
      });
  },
  selectors: {
    ingridients: (sliceState) => sliceState.allIngridients
  }
});

export const reducer = ingridientsSlice.reducer;
export const { ingridients } = ingridientsSlice.selectors;
