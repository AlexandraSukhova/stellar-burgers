import { expect, describe, jest } from '@jest/globals';
import { ingredientsMock } from '../mocks/mock-data';
import { fetchIngredients } from '../slices/assync-thunk/ingredients';
import {
  getIngredientError,
  getIngredients,
  isIngredientsLoading
} from '../slices/ingredient-slice';
import store from '../store';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('tests for ingredient slice', () => {
  const loading = () => isIngredientsLoading(store.getState());
  const error = () => getIngredientError(store.getState());
  const ingredients = () => getIngredients(store.getState());

  it('assyncThunk FAILED test', async () => {
    const failed = {
      type: fetchIngredients.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);

    expect(ingredients()).toEqual([]);
    expect(loading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('assyncThunk REQUEST test', async () => {
    const request = { type: fetchIngredients.pending.type };

    store.dispatch(request);

    expect(ingredients()).toEqual([]);
    expect(loading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('assyncThunk SUCCESS test', async () => {
    const success = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };

    await store.dispatch(success);

    expect(ingredients()).toEqual(ingredientsMock);
    expect(loading()).toBe(false);
    expect(error()).toBe(null);
  });
});
