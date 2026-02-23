export class IngridientCard {
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
    if (this.data.choosed) {
      card.style.backgroundColor = '#FDD55C';
      card.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.5)';
    }
    if (!this.data.choosed) {
      card.addEventListener('click', () => {
        if (this.multiple === false || !this.multiple) {
          this.builder.cardData.price -= this.builder.cardData.components[this.builder.currentKey][2];
          for (let cardElement of modalMenu.children) {
            cardElement.style.backgroundColor = '#EBEAE8';
            cardElement.style.boxShadow = 'none';
          }
        }
        card.style.backgroundColor = '#FDD55C';
        card.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.5)';

        if (typeof this.builder.cardData.components[this.builder.currentKey][0] === 'string') {
          this.builder.cardData.components[this.builder.currentKey] = [this.data.id, this.data.name];
        } else {
          this.builder.cardData.components[this.builder.currentKey].push([this.data.id, this.data.name]);
        }
        this.builder.cardData.price += this.data.price;
        this.builder.renderBuilder();
      });
    } else {
      card.addEventListener('click', () => {
        if (this.builder.currentKey === 'size' || this.builder.currentKey === 'bread') return;
        card.style.backgroundColor = '#EBEAE8';
        card.style.boxShadow = 'none';
        this.builder.cardData.price -= this.data.price;
        this.data.choosed = false;
        this.builder.cardData.components[this.builder.currentKey] = this.builder.cardData.components[
          this.builder.currentKey
        ].filter((item) => item[0] != this.data.id);
        this.builder.renderBuilder();
      });
    }
  }
}
