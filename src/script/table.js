import { switcherTable } from '@constant';
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
      if (tr.classList.contains('menu-switcher-active')) {
        tr.classList.remove('menu-switcher-active');
      }
      if (tr.classList.contains('menu-switcher-inactive')) {
        tr.classList.remove('menu-switcher-inactive');
      }
    }

    event.target.parentElement.classList.add('menu-switcher-active');
    for (let tr of table.children) {
      if (!tr.classList.contains('menu-switcher-active')) {
        tr.classList.remove('menu-switcher-inactive');
      }
    }

    let category = event.target.id.split('-')[2].split('&');
    pubSub.publish('menuType', { message: 'User changed menu category', category });
  };
}
