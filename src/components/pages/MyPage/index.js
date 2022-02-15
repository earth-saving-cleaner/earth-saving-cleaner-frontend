import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { getRankList } from "../../../api";
import { Text } from "../../atoms";
import { RankingList, UserInfo } from "../../organisms";
import { MyPageGrid, MainTemplate } from "../../templates";

const StyledText = styled(Text)`
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.purple};
`;

function MyPage() {
  const [rankingList, setRankList] = useState([]);
  const userInfo = useSelector((state) => state.user.data);
  const { profileImage, nickname, level, score } = userInfo;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRankList(userInfo);
        setRankList(response.data.rankList);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <MainTemplate>
      <MyPageGrid
        leftSide={<UserInfo profileImage={profileImage} nickname={nickname} level={level} score={score} />}
        rightSide={<RankingList rank={rankingList} />}
        rightSideTitle={<StyledText size="xxxl" text="Ranking" />}
      />
    </MainTemplate>
  );
}

export default MyPage;
