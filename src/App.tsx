import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";

import { InputText } from "./common/ui/inputText/InputText.tsx";
import ListOkived from "./components/ListOkived/ListOkived.tsx";
import { useDebounce } from "./hooks/useDebounce.ts";
import { getData } from "./services/getData.ts";

function App() {
  const [okivedData, setOkivedData] = useState<any>();
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

  return (
    <>
      <InputText
        onChange={onChangeHandler}
        placeholder={"Search"}
        type={"search"}
      ></InputText>
      <ListOkived items={okivedData || []} searchValue={searchDebounceValue} />
    </>
  );
}

export default App;
