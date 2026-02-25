import { ingredientSwitcher } from '@constant';

export function renderIngredientSwitcher() {
  const table = document.getElementById('ingredients-switcher');
  const tr = document.createElement('tr');
  for (let element in ingredientSwitcher) {
    const td = document.createElement('td');
    td.id = ingredientSwitcher[element].id;
    td.textContent = ingredientSwitcher[element].content;
    td.className = 'ingredients';
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
