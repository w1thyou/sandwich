import { counter } from '@script/counter.js';
import { pubSub } from '@script/pubSub.js';
import { accentColour } from '@constant';

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
  const listIngredients = document.createElement('ul');
  listIngredients.id = 'modal-ready-information-ingredients';
  for (let ingredient in cardData.components) {
    const ingredientElement = document.createElement('li');
    if (typeof cardData.components[ingredient][1] === 'string') {
      ingredientElement.textContent = `${settings[ingredient].name}: ${cardData.components[ingredient][1]}`;
    } else {
      let list = [];
      for (let component of cardData.components[ingredient]) {
        list.push(component[1]);
      }
      if (list.length === 0) list = 'Нет';
      ingredientElement.textContent = `${settings[ingredient].name}: ${list}`;
    }

    listIngredients.appendChild(ingredientElement);
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

  const row = document.getElementsByClassName('ingredients');
  for (let element of row) {
    if (element.classList.contains('modal-switcher-active')) {
      element.classList.remove('modal-switcher-active');
    }
    if (element.classList.contains('modal-switcher-inactive')) {
      element.classList.remove('modal-switcher-inactive');
    }
  }
  const finishElement = document.getElementById('finish');
  finishElement.classList.add('modal-switcher-active');

  for (let element of row) {
    if (!element.classList.contains('modal-switcher-active')) {
      element.classList.add('modal-switcher-inactive');
    }
  }

  toBasket.addEventListener('click', () => {
    const input = counterElem.querySelector('.product-counter-input');
    pubSub.publish('addToBasket', {
      message: 'User add product to basket',
      name: cardData.name,
      value: input.value,
      price: cardData.price
    });

    const modal = document.getElementById('modal');
    modal.classList.remove('modal-visible');
  });

  imageWrapper.appendChild(img);
  modalReady.appendChild(imageWrapper);

  modalProductContent.appendChild(title);
  modalProductContent.appendChild(listIngredients);
  modalProductContent.appendChild(name);
  modalReady.appendChild(modalProductContent);

  footer.appendChild(counterDescription);
  footer.appendChild(counterElem);

  priceWrapper.appendChild(toBasket);
  footer.appendChild(priceWrapper);

  document.getElementById('modal-menu-wrapper').appendChild(modalReady);
}
