import "./App.css";
import { useEffect, useState } from "react";

import ListOkived from "./components/ListOkived/ListOkived.tsx";
import { getData } from "./services/getData.ts";

function App() {
  const [okivedData, setOkivedData] = useState<any>();

  useEffect(() => {
    getData().then((res) => setOkivedData(res));
  }, []);
  console.log(okivedData);

  return <>{<ListOkived items={okivedData || []} />}</>;
}

export default App;
