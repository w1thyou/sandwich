import { store } from '@script/store.js';

export class IngredientCard {
  constructor(data, multiple, builder) {
    this.builder = builder;
    this.data = data;
    this.multiple = multiple;
  }

  renderModalCard() {
    const card = document.createElement('div');
    card.className = 'modal-card';

    const cardImg = document.createElement('div');
    cardImg.className = 'modal-card-img';

    const img = document.createElement('img');
    img.src = this.data['image'];

    const cardDescription = document.createElement('span');
    cardDescription.className = 'modal-card-description';
    cardDescription.textContent = this.data['name'];

    const cardPrice = document.createElement('span');
    cardPrice.className = 'modal-card-price';
    cardPrice.textContent = 'Цена: ' + this.data['price'] + 'руб.';

    cardImg.appendChild(img);
    card.appendChild(cardImg);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);

    const modalMenu = document.getElementById('modal-menu');
    modalMenu.appendChild(card);

    const sandwichConfig = store.getSandwichConfig();
    const currentStep = store.getCurrentStep();
    const components = sandwichConfig?.components?.[currentStep];

    let isChoosed = false;

    if (components === undefined || components === null) {
      isChoosed = false;
    } else if (Array.isArray(components)) {
      if (components.length === 0) {
        isChoosed = false;
      } else if (typeof components[0] === 'string') {
        isChoosed = components[0] === this.data.id;
      } else if (Array.isArray(components[0])) {
        isChoosed = components.some((item) => item && item[0] === this.data.id);
      }
    }

    if (isChoosed) {
      card.classList.add('modal-card-active');
    }

    if (!isChoosed) {
      card.addEventListener('click', () => {
        this.builder.selectIngredient(this.data);
      });
    } else {
      card.addEventListener('click', () => {
        if (currentStep === 'size' || currentStep === 'bread') return;

        card.classList.remove('modal-card-active');
        card.classList.add('modal-card-inactive');

        const newComponents = (components || []).filter((item) => item && item[0] !== this.data.id);
        sandwichConfig.components[currentStep] = newComponents;

        store.recalculatePrice();
        this.builder.renderBuilder();
      });
    }
  }
}
