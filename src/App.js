import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "./hooks/useSocket";
import { getCatsFetch } from "./state";
import useTheme from "./hooks/useTheme";

function App() {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const cats = useSelector((state) => state.cats.cats);

  // const [socket, disconnect] = useSocket("test");

  // useEffect(() => {
  //   socket.emit("test", "socket test");

  //   socket.on("test", (msg) => {
  //     console.log(msg);
  //   });

  //   return () => {
  //     disconnect();
  //   };
  // }, [socket]);

  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
