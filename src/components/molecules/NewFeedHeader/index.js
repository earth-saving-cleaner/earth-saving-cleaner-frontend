import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

function FeedHeader({ ...props }) {
  return (
    <StyledContainer>
      <Avatar url={props.url} size="sm" />
      <TextWrapper>
        <Text text={props.nickname} size="lg" weight="700" />
      </TextWrapper>
    </StyledContainer>
  );
}

FeedHeader.propTypes = {
  nickname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default FeedHeader;
