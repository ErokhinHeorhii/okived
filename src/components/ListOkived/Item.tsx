import { ChangeEvent, useEffect, useState } from "react";

import SuperCheckbox from "../../common/ui/SuperCheckbox/SuperCheckbox.tsx";

export type ItemType = {
  item: ItemsType;
};
export type ItemsType = {
  code: string;
  items?: Array<ItemsType>;
  name: string;
};
export enum ItemStatuses {
  NoChecked = 0,
  Checked = 1,
}
export const Item = ({ item }: ItemType) => {
  const [checkboxValue, setCheckboxValue] = useState(0);

  useEffect(() => {
    const checkboxStatusesFromLC = localStorage.getItem(item.code);

    if (checkboxStatusesFromLC) {
      setCheckboxValue(JSON.parse(checkboxStatusesFromLC));
    }
  }, []);
  const changeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? ItemStatuses.Checked
      : ItemStatuses.NoChecked;

    setCheckboxValue(status);
    localStorage.setItem(item.code, JSON.stringify(status));
  };

  return (
    <li>
      <SuperCheckbox
        checked={checkboxValue === 0 ? !!0 : !!1}
        onChange={changeStatusCheckbox}
      />
      <b>{item.code}</b> - <span>{item.name}</span>
    </li>
  );
};
