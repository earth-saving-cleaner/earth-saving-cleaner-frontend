import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledWrapper = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const DeacriptionWrapper = styled.div`
  padding: 1rem;
`;

function CommentHeader({ ...props }) {
  const { nickname, image, content } = props;
  return (
    <HeaderContainer>
      <StyledWrapper>
        <Avatar url={image} size="sm" />
        <TextWrapper>
          <Text text={nickname} size="small" weight="700" />
        </TextWrapper>
      </StyledWrapper>
      <DeacriptionWrapper>
        <Text text={content} size="base" />
      </DeacriptionWrapper>
    </HeaderContainer>
  );
}

CommentHeader.propTypes = {
  nickname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string,
};

CommentHeader.defaultProps = {
  content: "",
};

export default CommentHeader;
