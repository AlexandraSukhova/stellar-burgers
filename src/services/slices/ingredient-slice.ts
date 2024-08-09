import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENT_SLICE_NAME } from '../../utils/constants';
import { fetchIngredients } from './assync-thunk/ingredients';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    isIngredientsLoading: (state) => state.loading,
    getIngredientError: (state) => state.error
  }
});

export const { getIngredients, isIngredientsLoading, getIngredientError } =
  ingredientsSlice.selectors;
export default ingredientsSlice;
