import "./App.css";
import { useEffect, useState } from "react";

import { InputText } from "./common/ui/inputText/InputText.tsx";
import ListOkived from "./components/ListOkived/ListOkived.tsx";
import { getData } from "./services/getData.ts";

function App() {
  const [okivedData, setOkivedData] = useState<any>();

  useEffect(() => {
    getData().then((res) => setOkivedData(res));
  }, []);
  console.log(okivedData);

  return (
    <>
      <InputText placeholder={"Search"} type={"search"}></InputText>
      <ListOkived items={okivedData || []} />
    </>
  );
}

export default App;
