import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Avatar, Text } from "../../atoms";

const StyledWrapper = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  width: 100%;
`;

const ScrollWrapper = styled.div`
  height: 23rem;
  overflow-y: scroll;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
`;

function CommentBody({ ...props }) {
  const { commentList } = props;

  return (
    <ScrollWrapper>
      {commentList &&
        commentList.map((comment) => {
          const {
            content,
            author: { nickname, profileImage },
          } = comment;

          return (
            <StyledWrapper key={nickname + content}>
              <Avatar url={profileImage} size="sm" />
              <TextWrapper>
                <Text text={nickname} size="lg" weight="700" />
                <Text text={content} size="base" weight="400" />
              </TextWrapper>
            </StyledWrapper>
          );
        })}
    </ScrollWrapper>
  );
}

CommentBody.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentBody;
