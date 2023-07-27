import { ItemsType } from "../components/ListOkived/Item.tsx";

import { capitalize } from "./capitalize.ts";
import { lowerCase } from "./lowerCase.ts";

export const filterItems = (
  items: Array<ItemsType>,
  searchValue: string,
): Array<ItemsType> => {
  const capitalizeSearchValue = capitalize(searchValue);
  const lowerCaseSearchValue = lowerCase(searchValue);

  if (searchValue === "") {
    return items;
  }
  let matchedItems: Array<ItemsType> = [];

  for (let item of items) {
    if (
      item.name.includes(searchValue) ||
      item.name.includes(capitalizeSearchValue) ||
      item.name.includes(lowerCaseSearchValue)
    ) {
      matchedItems.push(item);
    }

    if (Array.isArray(item.items) && item.items.length > 0) {
      let subItems = filterItems(item.items, searchValue);

      matchedItems = [...matchedItems, ...subItems];
    }
  }

  return matchedItems;
};
