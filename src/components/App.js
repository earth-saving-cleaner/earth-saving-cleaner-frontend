import React from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div>Main page</div>
        </Route>
        <Route path="/mypage" exact>
          <div>My page</div>
        </Route>
        <Route path="/map" exact>
          <div>Map</div>
        </Route>
        <Route path="/login" exact>
          <div>login</div>
        </Route>
        <Route path="/signup" exact>
          <div>Sign up</div>
        </Route>
        <Route path="/*" exact>
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
