import { ItemsType } from "../components/ListOkived/Item.tsx";
import { getItemFromLocalStorage } from "../util/getItemFromLocalStorage.ts";

export const useGetItemsFromLocalStorage = (
  data: Array<ItemsType>,
): Array<ItemsType> => {
  let itemsFromLocalStorage: Array<ItemsType> = [];

  for (let item of data) {
    const itemFromLocalStorage = getItemFromLocalStorage(item);

    if (itemFromLocalStorage !== null) {
      if (Array.isArray(itemFromLocalStorage)) {
        for (let subItem of itemFromLocalStorage) {
          itemsFromLocalStorage.push(subItem);
        }
      } else {
        itemsFromLocalStorage.push(itemFromLocalStorage);
      }
    }
  }

  return itemsFromLocalStorage;
};
