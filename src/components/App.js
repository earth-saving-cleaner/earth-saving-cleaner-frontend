import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import { userSliceActions } from "../modules/slices/userSlice";

import { MainPage, MapPage, MyPage, LoginPage, SignupPage, NewFeedPage } from "./pages";

const Container = styled.div`
  width: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handleLoout = () => {
    dispatch(userSliceActions.logout());
  };

  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/mypage" exact>
          {user?.token ? <MyPage /> : <Redirect to="/login" />}
          <button type="button" onClick={handleLoout}>
            logout
          </button>
        </Route>
        <Route path="/map" exact>
          <MapPage />
        </Route>
        <Route path="/feed" exact>
          <NewFeedPage />
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
