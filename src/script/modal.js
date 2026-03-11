import { IngredientCard } from '@script/ingredientCard.js';
import { settings } from '@constant';
import { renderBuilderReady } from '@script/renderBuilderReady.js';
import { store } from '@script/store.js';

export class SandwichBuilder {
  constructor() {
    this.settings = settings;
    this.cardCollections = {};
  }

  async initialize() {
    await store.loadIngredients();
  }

  openBuilder() {
    document.body.classList.add('no-scroll');
    this.cardCollections = {};

    const modal = document.getElementById('modal');
    modal.classList.add('modal-visible');

    document.getElementById('previous-modal').onclick = () => {
      this.getPrevKey();
      this.renderBuilder();
    };

    document.getElementById('next-modal').onclick = () => {
      this.getNextKey();
      this.renderBuilder();
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
    const currentStep = store.getCurrentStep();
    const sandwichConfig = store.getSandwichConfig();

    if (this.settings[currentStep].object != 'ready') {
      document.getElementById('modal-menu-wrapper').innerHTML = '';
      const menu = document.createElement('div');
      menu.id = 'modal-menu';
      document.getElementById('modal-menu-wrapper').appendChild(menu);

      await this.initialize();

      const header = document.getElementById('header-text');
      header.textContent = this.settings[currentStep].title;
      const footer = document.getElementById('modal-footer');
      footer.textContent = 'Итого: ' + sandwichConfig.price + ' руб.';

      this.renderIngredientSwitcher();

      const ingredients = store.getIngredientsForStep(currentStep);
      this.cardCollections[currentStep] = [];

      for (let element of ingredients) {
        for (let product in element) {
          let cardElement = new IngredientCard(element[product], this.settings[currentStep].multiple, this);
          this.cardCollections[currentStep].push(cardElement);
        }
      }

      for (let card of this.cardCollections[currentStep]) {
        card.renderModalCard();
      }
    } else {
      renderBuilderReady(this.settings, sandwichConfig);
    }
  }

  renderIngredientSwitcher() {
    const currentStep = store.getCurrentStep();
    const row = document.getElementsByClassName('ingredients');
    for (let element of row) {
      if (element.classList.contains('modal-switcher-active')) {
        element.classList.remove('modal-switcher-active');
      }
      if (element.classList.contains('modal-switcher-inactive')) {
        element.classList.remove('modal-switcher-inactive');
      }
    }

    const currentElement = document.getElementById(currentStep);
    currentElement.classList.add('modal-switcher-active');
    for (let element of row) {
      if (!element.classList.contains('modal-switcher-active')) {
        element.classList.add('modal-switcher-inactive');
      }
    }
  }

  getNextKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(store.getCurrentStep());

    if (currentIndex === -1) return null;
    if (currentIndex === keys.length - 1) return null;
    const nextKey = keys[currentIndex + 1];
    store.setStep(nextKey);
    return nextKey;
  }

  getPrevKey() {
    const keys = Object.keys(this.settings);
    const currentIndex = keys.indexOf(store.getCurrentStep());

    if (currentIndex === -1) return null;
    if (currentIndex === 0) return null;
    const prevKey = keys[currentIndex - 1];
    store.setStep(prevKey);
    return prevKey;
  }

  closeBuilder() {
    document.removeEventListener('keydown', this.escKeyHandler);
    document.body.classList.remove('no-scroll');
    store.setStep('size');

    const modal = document.getElementById('modal');
    modal.classList.remove('modal-visible');
  }

  escKeyHandler = (event) => {
    if (event.key === 'Escape') {
      this.closeBuilder();
    }
  };

  selectIngredient(ingredient) {
    const currentStep = store.getCurrentStep();
    store.selectIngredient(currentStep, ingredient);
    this.renderBuilder();
  }
}
