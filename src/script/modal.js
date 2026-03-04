import { IngredientCard } from '@script/ingredientCard.js';
import { settings, secondaryColour } from '@constant';
import { renderBuilderReady } from '@script/renderBuilderReady.js';
import { loadJson } from '@api';
export class SandwichBuilder {
  constructor(data) {
    this.settings = settings;
    this.cardData = JSON.parse(JSON.stringify(data));
    for (let component in this.cardData.components) {
      if (typeof this.cardData.components[component] === 'string') {
        this.cardData.components[component] = [this.cardData.components[component], '', 0];
      } else {
        this.cardData.components[component] = this.cardData.components[component].map((item) => [
          item,
          '',
          0
        ]);
      }
    }
    this.cardCollections = {};
    this.currentKey = 'size';
  }

  async loadData() {
    let jsonData = await loadJson();

    let data = [];
    const clonedData = JSON.parse(JSON.stringify(jsonData[settings[this.currentKey].object]));
    data.push(clonedData);

    for (let comp in data[0]) {
      data[0][comp].id = comp;
      if (typeof this.cardData['components'][this.currentKey][0] != 'string') {
        for (let component of this.cardData['components'][this.currentKey]) {
          if (comp === component[0]) {
            data[0][comp].choosed = true;
            component = [data[0][comp].id, data[0][comp].name, data[0][comp].price];
          }
        }
      } else {
        if (this.cardData.components[this.currentKey][0] === comp) {
          data[0][comp].choosed = true;
          this.cardData.components[this.currentKey] = [
            data[0][comp].id,
            data[0][comp].name,
            data[0][comp].price
          ];
        }
      }
    }
    this.cardCollections[this.currentKey] = [];
    for (let element of data) {
      for (let product in element) {
        let cardElement = new IngredientCard(element[product], this.settings[this.currentKey].multiple, this);
        this.cardCollections[this.currentKey].push(cardElement);
      }
    }
    return data;
  }
  async initialize() {
    await this.loadData();
  }

  openBuilder() {
    document.body.style.overflow = 'hidden';
    this.cardCollections = {};
    this.currentKey = 'size';

    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    document.getElementById('previous-modal').onclick = () => {
      this.renderBuilder(this.settings[this.getPrevKey()]);
    };

    document.getElementById('next-modal').onclick = () => {
      this.renderBuilder(this.settings[this.getNextKey()]);
    };
    document.addEventListener('keydown', this.escKeyHandler);

    if (!document.getElementById('close-modal').onclick) {
      document.getElementById('modal').addEventListener('click', (event) => {
        if (event.target.id != 'modal') return;
        this.closeBuilder();
      });
      document.getElementById('close-modal').onclick = () => this.closeBuilder();
    }

    this.renderBuilder();
  }

  async renderBuilder() {
    if (this.settings[this.currentKey].object != 'ready') {
      document.getElementById('modal-menu-wrapper').innerHTML = '';
      const menu = document.createElement('div');
      menu.id = 'modal-menu';
      document.getElementById('modal-menu-wrapper').appendChild(menu);

      await this.initialize();

      const header = document.getElementById('header-text');
      header.textContent = this.settings[this.currentKey].title;
      const footer = document.getElementById('modal-footer');
      footer.textContent = 'Итого: ' + this.cardData.price + ' руб.';

      this.renderIngredientSwitcher();

      for (let card of this.cardCollections[this.currentKey]) {
        card.renderModalCard();
      }
    } else {
      renderBuilderReady(this.settings, this.cardData);
    }
  }

  renderIngredientSwitcher() {
    const row = document.getElementsByClassName('ingredients');
    for (let element of row) {
      element.style.backgroundColor = 'white';
    }
    document.getElementById(this.currentKey).style.backgroundColor = secondaryColour;
  }

  getNextKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(this.currentKey);

    if (currentIndex === -1) return null;
    if (currentIndex === keys.length - 1) return null;
    this.currentKey = keys[currentIndex + 1];
    return this.currentKey;
  }

  getPrevKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(this.currentKey);

    if (currentIndex === -1) return null;
    if (currentIndex === 0) return null;
    this.currentKey = keys[currentIndex - 1];
    return this.currentKey;
  }
  closeBuilder() {
    document.removeEventListener('keydown', this.escKeyHandler);
    document.body.style.overflow = '';
    this.currentKey = 'size';

    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  escKeyHandler = (event) => {
    if (event.key === 'Escape') {
      this.closeBuilder();
    }
  };
}
