import { useEffect, useState } from "react";

import { filterItems } from "../../util/filterItems.ts";
import { getCodes } from "../../util/getCodes.ts";

import { Item, ItemsType } from "./Item.tsx";
import style from "./ListOkived.module.css";

export interface BooleanObject {
  [key: string]: boolean;
}

type ListOkivedType = {
  items: Array<ItemsType>;
  searchValue: string;
  itemsFromLocalStorage: Array<ItemsType>;
};

const ListOkived = ({
  items,
  searchValue,
  itemsFromLocalStorage,
}: ListOkivedType) => {
  useEffect(() => {
    if (itemsFromLocalStorage.length > 0) {
      const startData = getCodes(items, itemsFromLocalStorage);

      setExpanded(startData);
    }
  }, [itemsFromLocalStorage]);

  const [expanded, setExpanded] = useState<BooleanObject>({});
  const toggleExpand = (code: string) => {
    setExpanded((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const renderItems = (items: Array<ItemsType>) => {
    return items.map((item) => {
      const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

      return (
        <div key={item.code}>
          {hasSubItems ? (
            <div className={style.itemContainer}>
              <Item item={item} />
              <div
                className={style.expandedStyle}
                onClick={() => toggleExpand(item.code)}
              >
                {expanded[item.code] ? "-" : "+"}
              </div>
            </div>
          ) : (
            <div className={style.itemContainer}>
              <Item item={item} />
            </div>
          )}
          {hasSubItems && expanded[item.code] && (
            <ul>{renderItems(item.items)}</ul>
          )}
        </div>
      );
    });
  };

  const filteredItems = filterItems(items, searchValue);

  return (
    <>
      <ul className={style.ulContainer}>{renderItems(filteredItems)}</ul>
      {filteredItems.length === 0 && "Change searchValue"}
    </>
  );
};

export default ListOkived;
