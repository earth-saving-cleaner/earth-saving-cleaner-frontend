import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  padding-right: 0;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin: 1rem 0 0 1rem;
`;

function NewFeedHeader({ url, nickname }) {
  return (
    <StyledContainer>
      <Avatar url={url} size="sm" />
      <TextWrapper>
        <Text text={nickname} size="base" weight="500" color="gray_3" />
      </TextWrapper>
    </StyledContainer>
  );
}

NewFeedHeader.propTypes = {
  nickname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NewFeedHeader;
