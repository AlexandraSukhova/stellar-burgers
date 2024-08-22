import exp from "constants";
import { bunIngredientMock, deleteConstructorMock, deletedIngredientMock, ingredientMock, ingredientsConstructorMock, moveDownConstructorMock } from "../mocks/mock-data";
import constructorSlice, { initialState, addIngredient, deleteIngredient, moveDownIngredient, moveUpIngredient, resetOrderModal } from "../slices/constructor-slice";

const reducer = constructorSlice.reducer;

describe('tests for costructor slice', () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('test for function addIngredient if ingredient not a bun', () => {
    const result = reducer(initialState, addIngredient(ingredientMock));

      const {bun, ingredients} = result.constructorItems;

    expect(ingredients).toHaveLength(1); // Проверка на то что ингредиент был добавлен
    expect(Object.keys(ingredients[0]).includes('id')).toBe(true); // Проверка, что ключ из prepare был добавлен
    expect(ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0945'); // Проверка что добавлен был именно тот ингредиент
    expect(ingredients[0].type !== 'bun').toBe(true); // Проверка, что добавленный ингредиент не является булкой
    expect(bun).toBe(null); // Проверка, что при добавлении ингридиента с типом не булка объект с булками остается пустым
  })

  it('test for function addIngredient if ingredient is bun', () => {
    const result = reducer(initialState, addIngredient(bunIngredientMock));

    const {bun, ingredients} = result.constructorItems;

    expect(typeof(bun?.id)).toBe('string'); // Проверка, что ключ из prepare был добавлен
    expect(bun?._id).toBe('643d69a5c3f7b9001cfa093d'); // Проверка что добавлен был именно тот ингредиент
    expect(bun?.type === 'bun').toBe(true); // Проверка, что добавленный ингредиент является булкой
    expect(ingredients).toHaveLength(0); /// Проверка, что при добавлении ингридиента с типом булка массив с остальными ингредиентами остается пустым
  })

  it('test for function deleteIngredient', () => {
    const result = reducer({
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: ingredientsConstructorMock
      }
      }, deleteIngredient(deletedIngredientMock));

      const { ingredients } = result.constructorItems;

      expect(ingredients).toEqual(deleteConstructorMock);
  })

  it('test for function moveUp and moveDown', () => {
    const state = {...initialState, constructorItems: {
      bun: null,
      ingredients: ingredientsConstructorMock
    }}

    const down = reducer(state, moveDownIngredient(0));
    let { ingredients } = down.constructorItems;

    expect(ingredients).toEqual(moveDownConstructorMock);

    const up = reducer(down, moveUpIngredient(1));
    ingredients = up.constructorItems.ingredients;

    expect(ingredients).toEqual(ingredientsConstructorMock);
  })

  it('test for function resetOrderModal', () => {
    const state = {
      ...initialState,
      orderModalData: {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 1,
        ingredients: ['']
      }
    }

    const resetModal = reducer(state, resetOrderModal());

    expect(resetModal.orderModalData).toBe(null);
  })
})
