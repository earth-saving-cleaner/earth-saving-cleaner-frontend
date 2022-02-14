import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160%;
  margin: 2rem;
  background: white;
  border-radius: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin: 1rem;
  align-items: center;
`;

const StyledText = styled(Text)`
  padding: 0.5rem;
  margin-right: 2rem;
`;

const Performance = styled.div`
  width: 90%;
  margin-left: 2rem;
`;

const LevelWrapper = styled.div`
  float: left;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

function RankingItem({ profileImage, nickname, level, score, index, ...props }) {
  return (
    <Wrapper {...props}>
      <UserProfile>
        <StyledText text={String(index)} size="lg" padding="1rem" />
        <Avatar url={profileImage} />
        <Performance>
          <StyledText text={nickname} />
          <LevelWrapper>
            <StyledText text={`Lv.${level}`} />
          </LevelWrapper>
        </Performance>
      </UserProfile>
      <Score>
        <StyledText text="Total" />
        <StyledText text={String(score)} />
      </Score>
    </Wrapper>
  );
}

RankingItem.propTypes = {
  profileImage: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  level: PropTypes.number,
  score: PropTypes.number,
  index: PropTypes.number,
};

RankingItem.defaultProps = {
  nickname: "anonymous",
  level: 0,
  score: 0,
  index: 0,
};

export default RankingItem;
