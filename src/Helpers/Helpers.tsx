import { Item } from 'types/types';

function sortItems(sort: string, initialItems: never[]) {
  const sortedItems: never[] = [];
  switch (sort) {
    case 'quantity-desc': // по убыванию количества
      sortedItems.push(...initialItems.sort((a: Item, b: Item) => b.quantity - a.quantity));
      break;
    case 'quantity-asc': // по возрастанию количества
      sortedItems.push(...initialItems.sort((a: Item, b: Item) => a.quantity - b.quantity));
      break;
    case 'distance-desc': // по убыванию дистанции
      sortedItems.push(...initialItems.sort((a: Item, b: Item) => b.distance - a.distance));
      break;
    case 'distance-asc': // по возрастанию дистанции
      sortedItems.push(...initialItems.sort((a: Item, b: Item) => a.distance - b.distance));
      break;
    case 'name-desc': // по убыванию названия
      sortedItems.push(
        ...initialItems.sort((a: Item, b: Item) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        })
      );
      break;
    case 'name-asc': // по возрастанию названия
      sortedItems.push(
        ...initialItems.sort((a: Item, b: Item) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      );
      break;
    default:
      sortedItems.push(...initialItems);
  }
  return sortedItems;
}

export { sortItems };
