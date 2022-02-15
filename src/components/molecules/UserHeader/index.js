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

function UserHeader({ ...props }) {
  return (
    <StyledContainer>
      <Avatar url={props.url} size="lg" />
      <TextWrapper>
        <NicknameWrapper>
          <Text text={props.nickname} size="xxxl" weight="700" />
        </NicknameWrapper>
        <LevelWrapper>
          <Text text={props.level} size="xxl" />
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
