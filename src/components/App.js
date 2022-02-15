import React from "react";

import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import { MainPage, MapPage, MyPage, LoginPage, SignupPage, MapClusteringPage } from "./pages";

const Container = styled.div`
  width: 100%;
`;

function App() {
  const user = useSelector((state) => state.user.data);

  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/mypage" exact>
          {user?.token ? <MyPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Route path="/map/plogging" exact>
          <MapClusteringPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/*" exact>
          <div>Not found</div>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
