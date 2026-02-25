import { pubSub } from '@script/pubSub.js';
import { menuSwicherCallback, addTobasketCallback } from '@callback';
export function subscribe() {
  pubSub.subscribe('addToBasket', addTobasketCallback);

  pubSub.subscribe('menuType', menuSwicherCallback);
}
