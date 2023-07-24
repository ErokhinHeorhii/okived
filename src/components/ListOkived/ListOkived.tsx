import { useState } from "react";

import { Item, ItemsType } from "./Item.tsx";

interface BooleanObject {
  [key: string]: boolean;
}

const ListOkived = ({ items }: { items: Array<ItemsType> }) => {
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
            <div onClick={() => toggleExpand(item.code)}>
              <Item item={item} />
              {expanded[item.code] ? "-" : "+"}
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

  return <ul>{renderItems(items)}</ul>;
};

export default ListOkived;
