import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Avatar, Text } from "../../atoms";

const CommentdContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 29rem;
  padding: 0.8rem;
  overflow-y: auto;
`;

const ScrollWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
`;

function CommentBody({ ...props }) {
  const { commentList } = props;

  return (
    <CommentdContainer>
      {commentList &&
        commentList.map((comment) => {
          const {
            content,
            author: { nickname, profileImage },
          } = comment;

          return (
            <ScrollWrapper key={nickname + content}>
              <Avatar url={profileImage} size="xs" />
              <TextWrapper>
                <Text text={nickname} size="small" weight="700" />
                <Text text={content} size="small" />
              </TextWrapper>
            </ScrollWrapper>
          );
        })}
    </CommentdContainer>
  );
}

CommentBody.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.object),
};

CommentBody.defaultProps = {
  commentList: [],
};

export default CommentBody;
