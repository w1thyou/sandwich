import { yellow } from '@constant';

export function addProduct(name, value, price) {
  const basket = document.getElementById('basket-content');
  const basketPrice = document.getElementById('order-status');
  //Создние строки с продкутом, добавляемым в корзину
  const template = document.getElementById('basket-content-template');
  const newContent = template.content.cloneNode(true);
  const td = newContent.querySelectorAll('td');
  td[0].textContent = name;
  td[1].textContent = value;
  basket.appendChild(newContent);

  let currentPrice = parseInt(basketPrice.dataset.price) || 0;

  //Изменение цены
  currentPrice += value * price;
  basketPrice.dataset.price = currentPrice;
  basketPrice.textContent = `Итого: ${currentPrice} руб.`;

  const orderButton = document.getElementById('place-an-order');
  orderButton.style.backgroundColor = yellow;
}
