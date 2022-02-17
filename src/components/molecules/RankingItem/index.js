import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160%;
  margin: 0.8rem;
  background: white;
  border-radius: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  padding-left: 0.6rem;
`;

const StyledText = styled(Text)`
  margin-right: 2rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Performance = styled.div`
  margin-left: 2rem;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 2rem;
  min-width: 7rem;
`;

function RankingItem({ profileImage, nickname, level, score, index, ...props }) {
  return (
    <Container {...props}>
      <UserProfile>
        <StyledText text={String(index)} />
        <Avatar url={profileImage} size="sm" />
        <Performance>
          <Text text={nickname} size="base" weight="700" />
          <StyledText text={`Lv.${level}`} />
        </Performance>
      </UserProfile>
      <Score>
        <Text text="Total" size="base" />
        <Text text={score} size="base" weight="700" />
      </Score>
    </Container>
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
