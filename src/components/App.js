import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import { MainPage, MapPage, MyPage, LoginPage, SignupPage, MapClusteringPage } from "./pages";
import { MainTemplate, NewFeedModalTemplate } from "./templates";
import { NewFeed } from "./organisms";

const Container = styled.div`
  width: 100%;
`;

function App() {
  const history = useHistory();
  const user = useSelector((state) => state.user.data);

  const [isNewFeedModalOpen, setIsNewFeedModalOpen] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  const handleNewFeedModalClick = (open) => {
    if (user?.token) {
      setIsNewFeedModalOpen(true);

      return;
    }

    history.push("/login");
  };

  useEffect(() => {
    if (imageInfo?.urls?.originalUrl) {
      setIsNewFeedModalOpen(true);
    }
  }, [imageInfo]);

  return (
    <Container>
      <MainTemplate onNewFeedClick={handleNewFeedModalClick} onImageFileChange={setImageInfo}>
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
      </MainTemplate>
      {isNewFeedModalOpen && user?.token && (
        <NewFeedModalTemplate>
          <NewFeed onModalCloseClick={setIsNewFeedModalOpen} imageInfo={imageInfo} />
        </NewFeedModalTemplate>
      )}
    </Container>
  );
}

export default App;
