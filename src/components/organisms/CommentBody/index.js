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

const commentList = [
  {
    author: {
      nickname: "Ken",
      profileImage: "https://www.vanillacoding.co/images/team/ken.jpg",
    },
    comments: "what?!",
  },
  {
    author: {
      nickname: "JK",
      profileImage: "https://www.vanillacoding.co/images/team/ken.jpg",
    },
    comments: "nononononononno?!",
  },
  {
    author: {
      nickname: "Woo",
      profileImage: "https://www.vanillacoding.co/images/team/ken.jpg",
    },
    comments: "okokokoko good",
  },
];

function CommentBody() {
  return (
    commentList &&
    commentList.map((comment) => {
      const {
        comments,
        author: { nickname, profileImage },
      } = comment;

      return (
        <StyledContainer key={nickname}>
          <Avatar url={profileImage} size="sm" />
          <TextWrapper>
            <Text text={nickname} size="lg" weight="700" />
            <Text text={comments} size="base" weight="400" />
          </TextWrapper>
        </StyledContainer>
      );
    })
  );
}

CommentBody.propTypes = {
  comment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentBody;
