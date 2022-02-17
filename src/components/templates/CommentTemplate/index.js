import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Img, Icon } from "../../atoms";
import CommentBody from "../../organisms/CommentBody";
import CommentFooter from "../../organisms/CommentFooter";
import CommentHeader from "../../organisms/CommentHeader";

const Container = styled.div`
  display: flex;
  justify-content: center
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50rem;
  height: 100%;
  background: ${({ theme }) => theme.opacityColor.gray_1};
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 100%;
  padding: 1rem;
`;

const CommentHeaderWrapper = styled.div`
  margin: 1rem 0 0 1rem;
  width: 100%;
`;

const CommentBodyWrapper = styled.div`
  margin: 2rem 0 22rem 1rem;
  width: 100%;
  height: 8rem;
`;

const CommentFooterWrapper = styled.div`
  margin-left: 1rem;
  width: 100%;
`;

function CommentTemplate({ ...props }) {
  const { comments, author, content, image, text, like } = props;
  return (
    <Container>
      <ImageWrapper>
        <Img width="100%" src={image} alt="feed" />
      </ImageWrapper>
      <ContentsWrapper>
        <CloseWrapper>
          <Icon icon="close" size="md" onClickIcon={() => props.onCloseClick(false)} />
        </CloseWrapper>
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
      </ContentsWrapper>
    </Container>
  );
}

CommentTemplate.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  content: PropTypes.string,
  image: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired,
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
