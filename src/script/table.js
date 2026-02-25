import { swicherTable, yellow } from '@constant';
import { pubSub } from '@script/pubSub.js';

export function renderSwicherTable() {
  const table = document.getElementById('menu-swicher');
  for (const type in swicherTable) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'menu-button';
    td.id = swicherTable[type].id;
    td.textContent = swicherTable[type].content;
    tr.appendChild(td);
    table.appendChild(tr);
  }
  table.onclick = function (event) {
    if (event.target.nodeName != 'TD') return;

    for (let tr of table.children) {
      tr.style.backgroundColor = 'white';
    }
    event.target.parentElement.style.backgroundColor = yellow;

    let category = event.target.id.split('-')[2].split('&');
    pubSub.publish('menuType', { message: 'Пользователь нажал на один из элементов меню', category });
  };
}
