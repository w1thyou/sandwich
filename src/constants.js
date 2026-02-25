import { PubSub } from '@script/pubSub.js';

export const yellow = '#FFC000';

export const settings = {
  size: {
    name: 'Размер',
    object: 'sizes',
    title: 'Выберите размер сендвича'
  },
  bread: {
    name: 'Хлеб',
    object: 'breads',
    title: 'Хлеб для сендвича на выбор'
  },
  vegetable: {
    name: 'Овощи',
    object: 'vegetables',
    title: 'Дополнительные овощи бесплатно',
    multiple: true
  },
  sauce: {
    name: 'Соус',
    object: 'sauces',
    title: 'Выберите 3 бесплатных соуса по вкусу',
    multiple: true
  },
  filling: {
    name: 'Начинка',
    object: 'fillings',
    title: 'Добавьте начинку по вкусу',
    multiple: true
  },
  finish: {
    name: 'Готово!',
    object: 'ready',
    title: 'Проверьте и добавьте в корзину'
  }
};

export const swicherTable = {
  pizza: { content: 'Пицца', id: 'menu-swicher-pizza-button' },
  shaurma: { content: 'Шаурма', id: 'menu-swicher-shaurma-button' },
  sandwiches: { content: 'Сендвичи', id: 'menu-swicher-sandwiches-button' },
  burgers: { content: 'Бургеры', id: 'menu-swicher-burgers-button' },
  chicken: { content: 'Курица & Картофель', id: 'menu-swicher-chicken-button' },
  salads: { content: 'Тортилья & Салаты', id: 'menu-swicher-salads-button' },
  drinks: { content: 'Напитки & Десерты', id: 'menu-swicher-drinks-button' }
};
