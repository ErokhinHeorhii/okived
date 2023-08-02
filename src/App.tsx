import { ChangeEvent, useEffect, useState } from "react";

import { InputText } from "./common/ui/inputText/InputText.tsx";
import { ItemsType } from "./components/ListOkived/Item.tsx";
import ListOkived from "./components/ListOkived/ListOkived.tsx";
import { useDebounce } from "./hooks/useDebounce.ts";
import { useGetItemsFromLocalStorage } from "./hooks/useGetItemsFromLocalStorage.ts";
import { getData } from "./services/getData.ts";

import "./App.css";

function App() {
  const [okivedData, setOkivedData] = useState<Array<ItemsType>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchDebounceValue, setSearchDebounceValue] = useState("");
  const debounceValue = useDebounce<string>(searchValue as string);

  useEffect(() => {
    getData().then((res) => setOkivedData(res));
  }, []);

  useEffect(() => {
    setSearchDebounceValue(debounceValue);
  }, [debounceValue]);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const itemsFromLocalStorage = useGetItemsFromLocalStorage(okivedData);

  return (
    <div className="container">
      <InputText
        onChange={onChangeHandler}
        placeholder={"Search"}
        type={"search"}
      ></InputText>
      <ListOkived
        items={okivedData || []}
        searchValue={searchDebounceValue}
        itemsFromLocalStorage={itemsFromLocalStorage}
      />
    </div>
  );
}

export default App;
