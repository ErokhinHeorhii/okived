import { ItemsType } from "../components/ListOkived/Item.tsx";

export const getItemFromLocalStorage = (item: ItemsType): any => {
  const gotLocalStorageItem = localStorage.getItem(item.code);

  const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

  if (hasSubItems) {
    const subItemsInLocalStorage = item
      .items!.map((subItem) => getItemFromLocalStorage(subItem))
      .filter((subItem) => subItem !== null);

    if (subItemsInLocalStorage.length > 0) {
      if (gotLocalStorageItem && JSON.parse(gotLocalStorageItem) === 1) {
        subItemsInLocalStorage.unshift({ ...item });
      }

      return subItemsInLocalStorage.flat();
    } else {
      if (gotLocalStorageItem && JSON.parse(gotLocalStorageItem) === 1) {
        return { ...item };
      } else {
        return null;
      }
    }
  } else {
    if (gotLocalStorageItem && JSON.parse(gotLocalStorageItem) === 1) {
      return { ...item };
    } else {
      return null;
    }
  }
};
