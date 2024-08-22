import {expect, describe, jest} from '@jest/globals';
import { ingredientsMock } from '../mocks/mock-data';
import { fetchIngredients } from '../slices/assync-thunk/ingredients';
import { getIngredientError, getIngredients, isIngredientsLoading } from '../slices/ingredient-slice';
import store from '../store';
import { getIngredientsApi } from '@api';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('tests for ingredient slice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('assyncThunk ERROR test', async() => {
    (getIngredientsApi as jest.Mock).mockRejectedValue('404 not found' as never);

    await store.dispatch(fetchIngredients());
    const loading = isIngredientsLoading(store.getState());
    const error = getIngredientError(store.getState());
    const ingredients = getIngredients(store.getState());

    expect(getIngredientsApi).toBeCalledTimes(1);
    expect(ingredients).toEqual([]);
    expect(loading).toBe(false);
    expect(error?.message).toBe('404 not found');
  })

  it('assyncThunk LOADING test', async() => {
    (getIngredientsApi as jest.Mock).mockReturnValue(new Promise(() => {}));

    store.dispatch(fetchIngredients());
    const loading = isIngredientsLoading(store.getState());
    const error = getIngredientError(store.getState());
    const ingredients = getIngredients(store.getState());

    expect(getIngredientsApi).toBeCalledTimes(2);
    expect(ingredients).toEqual([]);
    expect(loading).toBe(true);
    expect(error).toBe(null);
  })

  it('assyncThunk SUCCESS test', async() => {
    (getIngredientsApi as jest.Mock).mockResolvedValue(ingredientsMock as never);

    await store.dispatch(fetchIngredients());
    const loading = isIngredientsLoading(store.getState());
    const error = getIngredientError(store.getState());
    const ingredients = getIngredients(store.getState());

    expect(getIngredientsApi).toBeCalledTimes(3);
    expect(ingredients).toEqual(ingredientsMock);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  })
})
