import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSocket from "./hooks/useSocket";
import { getCatsFetch } from "./state";

function App() {
  // const [socket, disconnect] = useSocket("test");
  const cats = useSelector((state) => state.cats.cats);
  const dispatch = useDispatch();

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

  console.log(cats);

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
