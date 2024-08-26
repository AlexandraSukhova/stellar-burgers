import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData,
  TUser
} from '@utils-types';

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
  _id: '643d69a5c3f7b9001cfa093d'
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
  }
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
  }
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
};

export const modalDataMock: TOrder = {
  ingredients: [],
  _id: '12345',
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-08-24T15:36:05.210Z',
  updatedAt: '2024-08-24T15:36:05.722Z',
  number: 50981
};

export const userMock: TUser = {
  email: 'alexandra@mail.ru',
  name: 'Alexandra'
};

export const feedMock: TOrdersData = {
  orders: [
    {
      _id: '66ca0159119d45001b501df5',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-08-24T15:50:49.077Z',
      updatedAt: '2024-08-24T15:50:49.619Z',
      number: 50987
    },
    {
      _id: '66ca00df119d45001b501df2',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный минеральный био-марсианский бургер',
      createdAt: '2024-08-24T15:48:47.036Z',
      updatedAt: '2024-08-24T15:48:47.582Z',
      number: 50986
    }
  ],
  total: 2000,
  totalToday: 2
};

export const userOrdersMock: TOrder[] = [
  {
    _id: '66b47e31119d45001b4fe58d',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-08T08:13:37.656Z',
    updatedAt: '2024-08-08T08:13:38.126Z',
    number: 48809
  },
  {
    _id: '66b47ea3119d45001b4fe58f',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-08T08:15:31.968Z',
    updatedAt: '2024-08-08T08:15:32.422Z',
    number: 48810
  }
];
