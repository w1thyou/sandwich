import { switcherTable, secondaryColour } from '@constant';
import { pubSub } from '@script/pubSub.js';

export function renderSwitcherTable() {
  const table = document.getElementById('menu-switcher');
  for (const type in switcherTable) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'menu-button';
    td.id = switcherTable[type].id;
    td.textContent = switcherTable[type].content;
    tr.appendChild(td);
    table.appendChild(tr);
  }
  table.onclick = function (event) {
    if (event.target.nodeName != 'TD') return;

    for (let tr of table.children) {
      tr.style.backgroundColor = 'white';
    }
    event.target.parentElement.style.backgroundColor = secondaryColour;

    let category = event.target.id.split('-')[2].split('&');
    pubSub.publish('menuType', { message: 'Пользователь нажал на один из элементов меню', category });
  };
}
