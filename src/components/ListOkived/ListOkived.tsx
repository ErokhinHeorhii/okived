import { useState } from "react";

import { filterItems } from "../../util/filterItems.ts";

import { Item, ItemsType } from "./Item.tsx";

interface BooleanObject {
  [key: string]: boolean;
}

type ListOkivedType = {
  items: Array<ItemsType>;
  searchValue: string;
};

const ListOkived = ({ items, searchValue }: ListOkivedType) => {
  const [expanded, setExpanded] = useState<BooleanObject>({});

  const toggleExpand = (code: string) => {
    setExpanded((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const renderItems = (items: Array<ItemsType>) => {
    return items.map((item: any) => {
      const hasSubItems = Array.isArray(item.items) && item.items.length > 0;

      return (
        <div key={item.code}>
          {hasSubItems ? (
            <div>
              <Item item={item} />
              <div onClick={() => toggleExpand(item.code)}>
                {expanded[item.code] ? "-" : "+"}
              </div>
            </div>
          ) : (
            <Item item={item} />
          )}
          {hasSubItems && expanded[item.code] && (
            <ul>{renderItems(item.items)}</ul>
          )}
        </div>
      );
    });
  };

  const filteredItems = filterItems(items, searchValue);

  return <ul>{renderItems(filteredItems)}</ul>;
};

export default ListOkived;
