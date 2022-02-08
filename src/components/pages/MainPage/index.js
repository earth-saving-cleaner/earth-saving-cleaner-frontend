import React from "react";
import { MainTemplate } from "../../templates";
import { FeedCard } from "../../organisms";

function MainPage() {
  return (
    <MainTemplate>
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </MainTemplate>
  );
}

export default MainPage;
