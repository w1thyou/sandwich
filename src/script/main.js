import { renderSwitcherTable } from '@script/table.js';
import { subscribe } from '@script/subscribes.js';
import { renderIngredientSwitcher } from '@script/ingredientSwitcher.js';

renderSwitcherTable();
renderIngredientSwitcher();
subscribe();

document.getElementById('menu-switcher-pizza-button').click();
