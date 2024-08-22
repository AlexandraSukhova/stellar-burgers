import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const ingredientsMock: TIngredient[] = [
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941'
  },
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945'
  },
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    name: 'Флюоресцентная булка R2-D3',
    price: 988,
    proteins: 44,
    type: 'bun',
    _id: '643d69a5c3f7b9001cfa093d'
  }
];

export const ingredientMock: TIngredient = {
  calories: 100,
  carbohydrates: 100,
  fat: 99,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  name: 'Соус с шипами Антарианского плоскоходца',
  price: 88,
  proteins: 101,
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0945'
};

export const bunIngredientMock: TIngredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  name: 'Флюоресцентная булка R2-D3',
  price: 988,
  proteins: 44,
  type: 'bun',
  _id: '643d69a5c3f7b9001cfa093d',
};

export const ingredientsConstructorMock: TConstructorIngredient[] = [
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  },
]

export const moveUpConstructorMock: TConstructorIngredient[] = [
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  },
];

export const moveDownConstructorMock: TConstructorIngredient[] = [
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  },
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  }
];

export const deleteConstructorMock: TConstructorIngredient[] = [
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  },
];

export const deletedIngredientMock: TConstructorIngredient = {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  }

