import { Card } from '@script/card.js';
import { loadJson } from '@api';

//Меню продуктов
export class Menu {
  constructor(category) {
    this.data = [];
    this.category = category;
    this.initialized = this.initialize();
  }

  async initialize() {
    await this.loadData();
  }
  //функция загрузки данных
  async loadData() {
    let jsonData = await loadJson();
    let data = [];

    //Отбор продуктов из нужной категории
    for (let product of jsonData['menu']) {
      if (
        (product['category'] === this.category[0] || product['category'] === this.category[1]) &&
        product['image'].includes(this.category)
      ) {
        data.push(product);
      }
    }

    //Создание карточек товаров и сохранение их информации
    for (let product of data) {
      let cardElement = new Card(product);
      this.data.push(cardElement);
    }
    return data;
  }

  //Отрисовка меню
  async render() {
    await this.initialized;

    let menu = document.getElementById('menu');
    menu.innerHTML = '';

    for (let card of this.data) {
      let cardElement = card.render();
      menu.appendChild(cardElement);
    }
  }
}
