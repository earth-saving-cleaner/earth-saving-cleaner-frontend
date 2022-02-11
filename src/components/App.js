import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import { loginSliceActions } from "../modules/slices/loginSlice";

import { MainPage, LoginPage, SignupPage } from "./pages";

const Container = styled.div`
  width: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handleLoout = () => {
    dispatch(loginSliceActions.logout());
  };

  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/mypage" exact>
          {user?.token ? <div>My page</div> : <Redirect to="/login" />}
          <button type="button" onClick={handleLoout}>
            logout
          </button>
        </Route>
        <Route path="/map" exact>
          <div>Map</div>
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
