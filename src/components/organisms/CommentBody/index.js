import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Avatar, Text } from "../../atoms";

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
`;

function CommentBody({ commets }) {
  return commets.map((comment) => {
    const { nickname, profileImage } = comment.author;
    return (
      <StyledContainer key={nickname}>
        <Avatar url={profileImage} size="sm" />
        <TextWrapper>
          <Text text={nickname} size="lg" weight="700" />
          <Text text={comment.comments} size="base" weight="400" />
        </TextWrapper>
      </StyledContainer>
    );
  });
}

CommentBody.propTypes = {
  comment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentBody;
