import { counter } from '@script/counter.js';
import { IngridientCard } from '@script/ingridientCard.js';
import { settings, pubSub } from '@constant';
import { renderBuilderReady } from '@script/renderBuilderReady.js';
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
    this.cardCollections = {};
    let jsonData;
    try {
      const response = await fetch('data.json');
      jsonData = await response.json();
    } catch (error) {
      console.error(`Не удается прочитать data.json\n\n${error}`);
    }

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
        let cardElement = new IngridientCard(element[product], this.settings[this.currentKey].multiple, this);
        this.cardCollections[this.currentKey].push(cardElement);
      }
    }

    // console.log(data);
    return data;
  }
  async initialize() {
    await this.loadData();
  }

  openBuilder() {
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

    if (!document.getElementById('close-modal').onclick) {
      document.getElementById('close-modal').onclick = () => this.closeBuilder();
    }

    this.renderBuilder(this.settings[this.currentKey], this.cardData);
  }

  async renderBuilder() {
    if (this.settings[this.currentKey].object != 'ready') {
      document.getElementById('modal-menu-wrapper').innerHTML = '';
      const menu = document.createElement('div');
      menu.id = 'modal-menu';
      document.getElementById('modal-menu-wrapper').appendChild(menu);

      await this.initialize();
      // console.log(type);
      // console.log(data);
      // console.log(data.price);
      const header = document.getElementById('header-text');
      header.textContent = this.settings[this.currentKey].title;
      const footer = document.getElementById('modal-footer');
      footer.textContent = 'Итого: ' + this.cardData.price + ' руб.';

      this.renderIngridientSwicher();

      for (let card of this.cardCollections[this.currentKey]) {
        card.renderModalCard();
      }
    } else {
      renderBuilderReady(this.settings, this.cardData);
    }
  }

  renderIngridientSwicher() {
    const row = document.getElementsByClassName('ingridients');
    for (let element of row) {
      element.style.backgroundColor = 'white';
    }
    document.getElementById(this.currentKey).style.backgroundColor = '#FFC000';
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
    this.currentKey = 'size';

    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
}
