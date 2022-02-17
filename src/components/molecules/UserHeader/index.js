import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  padding-right: 0;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const NicknameWrapper = styled.div`
  margin: 2rem;
`;

const LevelWrapper = styled.div`
  float: right;
`;

function UserHeader({ url, nickname, level }) {
  return (
    <StyledContainer>
      <Avatar url={url} size="lg" />
      <TextWrapper>
        <NicknameWrapper>
          <Text text={nickname} size="xl" weight="700" />
        </NicknameWrapper>
        <LevelWrapper>
          <Text text={level} size="md" color="red" />
        </LevelWrapper>
      </TextWrapper>
    </StyledContainer>
  );
}

UserHeader.propTypes = {
  nickname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
};

export default UserHeader;
