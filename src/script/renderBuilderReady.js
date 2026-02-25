import { counter } from '@script/counter.js';
import { pubSub } from '@script/pubSub.js';
import { yellow } from '@constant';

export function renderBuilderReady(settings, cardData) {
  document.getElementById('modal-menu-wrapper').innerHTML = '';
  const header = document.getElementById('header-text');
  header.textContent = settings.finish.title;

  const modalReady = document.createElement('div');
  modalReady.id = 'modal-ready';
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'modal-card-img modal-ready';
  const img = document.createElement('img');
  img.src = cardData.image;
  const modalProductContent = document.createElement('div');
  modalProductContent.id = 'modal-ready-information';
  const title = document.createElement('span');
  title.textContent = 'Ваш сендвич готов!';
  const listIngridients = document.createElement('ul');
  listIngridients.id = 'modal-ready-information-ingridients';
  for (let ingridient in cardData.components) {
    const ingridientElement = document.createElement('li');
    if (typeof cardData.components[ingridient][1] === 'string') {
      ingridientElement.textContent = `${settings[ingridient].name}: ${cardData.components[ingridient][1]}`;
    } else {
      let list = [];
      for (let component of cardData.components[ingridient]) {
        list.push(component[1]);
      }
      if (list.length === 0) list = 'Нет';
      ingridientElement.textContent = `${settings[ingridient].name}: ${list}`;
    }

    listIngridients.appendChild(ingridientElement);
  }
  const name = document.createElement('span');
  name.id = 'modal-ready-name';
  name.textContent = cardData.name;

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = '';
  const counterDescription = document.createElement('span');
  counterDescription.id = 'modal-counter-description';
  counterDescription.textContent = 'КОЛИЧЕСТВО';
  const counterElem = counter();

  const priceWrapper = document.createElement('div');
  priceWrapper.textContent = 'Итого: ' + cardData.price + ' руб.';
  const toBasket = document.createElement('button');
  toBasket.id = 'modal-add-to-basket';
  toBasket.className = 'product-add-to-basket';
  toBasket.textContent = 'В КОРЗИНУ';

  const row = document.getElementsByClassName('ingridients');
  for (let element of row) {
    element.style.backgroundColor = 'white';
  }
  document.getElementById('finish').style.backgroundColor = yellow;

  toBasket.addEventListener('click', () => {
    const input = counterElem.querySelector('.product-counter-input');
    pubSub.publish('addToBasket', {
      message: 'Пользователь добавил товар в корзину',
      name: cardData.name,
      value: input.value,
      price: cardData.price
    });

    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  });

  imageWrapper.appendChild(img);
  modalReady.appendChild(imageWrapper);

  modalProductContent.appendChild(title);
  modalProductContent.appendChild(listIngridients);
  modalProductContent.appendChild(name);
  modalReady.appendChild(modalProductContent);

  footer.appendChild(counterDescription);
  footer.appendChild(counterElem);

  priceWrapper.appendChild(toBasket);
  footer.appendChild(priceWrapper);

  document.getElementById('modal-menu-wrapper').appendChild(modalReady);
}
