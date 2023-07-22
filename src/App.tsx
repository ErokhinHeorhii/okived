import "./App.css";
import { useEffect, useState } from "react";

import { getData } from "./services/getData.ts";

function App() {
  const [okivedData, setOkivedData] = useState<any>();

  useEffect(() => {
    getData().then((res) => setOkivedData(res));
  }, []);
  console.log(okivedData);

  return <>{okivedData && okivedData[0].code}</>;
}

export default App;
