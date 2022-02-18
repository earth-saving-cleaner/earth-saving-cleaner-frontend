import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getRankList } from "../../../api";
import { Text } from "../../atoms";
import { RankingList, UserInfo } from "../../organisms";
import { MyPageTemplate } from "../../templates";

const StyledText = styled(Text)`
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.purple};
  font-weight: bold;
`;

function MyPage() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.data);

  const [rankingList, setRankList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRankList(userInfo);

        if (response === "Request failed with status code 401") {
          history.push("/login");
          return;
        }

        setRankList(response.data.rankList);
      } catch (err) {
        console.error(err);
        return err.message;
      }
    }

    fetchData();
  }, []);

  return (
    <MyPageTemplate
      leftSide={<UserInfo />}
      rightSide={<RankingList rank={rankingList} />}
      rightSideTitle={<StyledText size="xxxl" text="Ranking" />}
    />
  );
}

export default MyPage;
