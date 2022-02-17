import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { getRankList } from "../../../api";
import { Text } from "../../atoms";
import { RankingList, UserInfo } from "../../organisms";
import { MyPageTemplate, MainTemplate } from "../../templates";

const StyledText = styled(Text)`
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.purple};
  font-weight: bold;
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
    <MyPageTemplate
      leftSide={<UserInfo profileImage={profileImage} nickname={nickname} level={level} score={score} />}
      rightSide={<RankingList rank={rankingList} />}
      rightSideTitle={<StyledText size="xxxl" text="Ranking" />}
    />
  );
}

export default MyPage;
