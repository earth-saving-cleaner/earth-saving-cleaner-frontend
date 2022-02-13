import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  margin-top: 3rem;
`;

function UserHeader({ ...props }) {
  return (
    <StyledContainer>
      <Avatar url={props.url} size="lg" />
      <TextWrapper>
        <Text text={props.nickname} size="xxxl" weight="700" />
        <Text text={props.level} size="xxl" />
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
