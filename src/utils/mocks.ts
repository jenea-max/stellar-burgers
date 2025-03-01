import { TIngredient } from '@utils-types';

export const bunFirstMock: TIngredient = {
  _id: '1',
  name: 'Булка 1',
  type: 'bun',
  proteins: 44,
  fat: 26,
  calories: 643,
  carbohydrates: 85,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};
export const bunSecondMock: TIngredient = {
  _id: '2',
  name: 'Булка 2',
  type: 'bun',
  proteins: 80,
  fat: 24,
  calories: 420,
  carbohydrates: 53,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mainFirstMock: TIngredient = {
  _id: '3',
  name: 'Начинка 1',
  type: 'main',
  proteins: 44,
  fat: 26,
  calories: 643,
  carbohydrates: 85,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};
export const mainSecondMock: TIngredient = {
  _id: '4',
  name: 'Начинка 2',
  type: 'main',
  proteins: 800,
  fat: 800,
  calories: 2674,
  carbohydrates: 300,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

export const sauceFirstMock: TIngredient = {
  _id: '5',
  name: 'Соус 1',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  calories: 30,
  carbohydrates: 40,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};
export const sauceSecondMock: TIngredient = {
  _id: '6',
  name: 'Соус 2',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  calories: 14,
  carbohydrates: 11,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

// Массив всех моковых ингредиентов
export const mockIngredients: TIngredient[] = [
  bunFirstMock,
  bunSecondMock,
  mainFirstMock,
  mainSecondMock,
  sauceFirstMock,
  sauceSecondMock
];

// Моковые данные для фида заказов
export const mockFeed = {
  success: true,
  orders: [
    {
      _id: '669e64dd9ed280001b475567',
      ingredients: ['61c0c5a71d1f82001bdaaa6d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-07-01T15:33:00.000Z',
      updatedAt: '2025-07-01T15:36:10.770Z',
      number: 99312
    },
    {
      _id: '669e63c79ed280001b47552b',
      ingredients: ['61c0c5a71d1f82001bdaaa78'],
      status: 'done',
      name: 'Альфа-сахаридный бургер',
      createdAt: '2025-07-01T15:33:00.000Z',
      updatedAt: '2025-07-01T15:36:10.770Z',
      number: 99310
    },
    {
      _id: '669e60c29ed280001b4754e8',
      ingredients: ['61c0c5a71d1f82001bdaaa6d', '61c0c5a71d1f82001bdaaa6f'],
      status: 'done',
      name: 'Бессмертный флюоресцентный бургер',
      createdAt: '2025-07-01T15:33:00.000Z',
      updatedAt: '2025-07-01T15:36:10.770Z',
      number: 99308
    }
  ],
  total: 99331,
  totalToday: 466
};

// Моковые данные для одного заказа
export const mockOrder = {
  success: true,
  orders: [
    {
      _id: '63e2dfd6119d45001b5066e0',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '63d83149119d45001b5040b1',
      status: 'done',
      name: 'Твой космо-бургер',
      createdAt: '2025-01-07T14:22:00.000Z',
      updatedAt: '2025-01-07T14:25:00.000Z',
      number: 52816,
      __v: 0
    }
  ]
};

// Моковые данные для пост-запроса на создание заказа
export const mockPostOrder = {
  success: true,
  name: 'Твой космо-бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '63e2dfd6119d45001b5066e0',
    owner: {
      name: 'Евгения',
      email: 'egradeskova@edu.hse.ru',
      createdAt: '2025-01-07T14:22:00.000Z',
      updatedAt: '2025-01-07T14:25:00.000Z'
    },
    status: 'done',
    name: 'Твой космо-бургер',
    number: 52816,
    price: 2790,
    createdAt: '2025-01-07T14:22:00.000Z',
    updatedAt: '2025-01-07T14:25:00.000Z'
  }
};

// Моковые данные для пользователя
export const mockUser = {
  success: true,
  user: {
    email: 'egradeskova@edu.hse.ru',
    name: 'Евгения'
  }
};
