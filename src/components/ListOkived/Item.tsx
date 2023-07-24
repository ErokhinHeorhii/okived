export type ItemType = {
  item: ItemsType;
};
export type ItemsType = {
  code: string;
  items?: Array<[ItemsType]>;
  name: string;
};

export const Item = ({ item }: ItemType) => {
  return (
    <li>
      <b>{item.code}</b> - <span>{item.name}</span>
    </li>
  );
};
