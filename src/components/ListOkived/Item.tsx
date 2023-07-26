import { ChangeEvent, useEffect, useState } from "react";

export type ItemType = {
  item: ItemsType;
};
export type ItemsType = {
  code: string;
  items?: Array<[ItemsType]>;
  name: string;
};

export const Item = ({ item }: ItemType) => {
  const [checkboxValue, setCheckboxValue] = useState(false);

  useEffect(() => {
    const checkboxStatusesFromLC = localStorage.getItem(item.code);

    if (checkboxStatusesFromLC) {
      setCheckboxValue(JSON.parse(checkboxStatusesFromLC));
    }
  }, []);
  const changeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked;

    setCheckboxValue(status);
    localStorage.setItem(item.code, JSON.stringify(status));
  };

  return (
    <li>
      <input
        type={"checkbox"}
        checked={checkboxValue}
        onChange={changeStatusCheckbox}
      />
      <b>{item.code}</b> - <span>{item.name}</span>
    </li>
  );
};
