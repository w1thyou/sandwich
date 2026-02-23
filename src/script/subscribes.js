import { pubSub } from '@constant';
import { menuSwicherCallback, addTobasketCallback } from '@callback';

pubSub.subscribe('addToBasket', addTobasketCallback);

pubSub.subscribe('menuType', menuSwicherCallback);
