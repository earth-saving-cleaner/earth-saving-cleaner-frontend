import React from "react";
import { Route, Switch } from "react-router-dom";

import { MainPage, MapPage, MyPage, NewFeedPage } from "./pages";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/mypage" exact>
          <MyPage />
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Route path="/feed" exact>
          <NewFeedPage />
        </Route>
        <Route path="/login" exact>
          <div>login</div>
          <Login />
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
