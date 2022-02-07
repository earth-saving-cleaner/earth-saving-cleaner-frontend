import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Avatar, Text } from "../../atoms";

const Wrapper = styled.div`
  width: 100%;
  margin: 2rem;
  background: white;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
`;

const UserProfile = styled.div`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const StyledText = styled(Text)`
  padding: 0.5rem;
`;

const Performance = styled.div`
  text-align: center;
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
        <Avatar src={profileImage} />
        <Performance>
          <StyledText text={nickname} />
          <StyledText text={`Lv.${level}`} />
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
