import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Img from "../../atoms/Img";
import CommentHeader from "../../organisms/CommentHeader";
import CommentBody from "../../organisms/CommentBody";
import CommentFooter from "../../organisms/CommentFooter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const Right = styled.div`
  width: 100%;
  height: 80%;
`;

const Left = styled.div`
  width: 80%;
  height: 80%;
`;

const CommentHeaderWrapper = styled.div`
  margin: 1rem 0 0 1rem;
`;

const CommentBodyWrapper = styled.div`
  margin: 2rem 0 22rem 1rem;
  height: 2rem;
`;

const CommentFooterWrapper = styled.div`
  margin-left: 1rem;
`;

function CommentTemplate({ ...props }) {
  const { comments, author, content, image, text, like } = props;
  return (
    <Wrapper>
      <Left>
        <Img width="100%" src={image} alt="feed" />
      </Left>
      <Right>
        <CommentHeaderWrapper>
          <CommentHeader nickname={author.nickname} image={author.profileImage} content={content} />
        </CommentHeaderWrapper>
        <CommentBodyWrapper>
          <CommentBody commentList={comments} />
        </CommentBodyWrapper>
        <CommentFooterWrapper>
          <CommentFooter
            onSubmit={props.onClickCommentButton}
            onChangeText={props.onChangeText}
            text={text}
            onClickLikeIcon={props.onClickLikeIcon}
            isIconFilled={props.isIconFilled}
            like={like}
          />
        </CommentFooterWrapper>
      </Right>
    </Wrapper>
  );
}

CommentTemplate.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  content: PropTypes.string,
  image: PropTypes.string.isRequired,
  onClickCommentButton: PropTypes.func.isRequired,
  onClickLikeIcon: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  isIconFilled: PropTypes.bool,
  text: PropTypes.string,
  like: PropTypes.number,
};

CommentTemplate.defaultProps = {
  comments: [],
  content: "",
  isIconFilled: false,
  text: "",
  like: 0,
};

export default CommentTemplate;
