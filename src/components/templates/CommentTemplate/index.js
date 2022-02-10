import React from "react";
import styled from "styled-components";

import Img from "../../atoms/Img";
import CommentHeader from "../../organisms/CommentHeader";
import CommentBody from "../../organisms/CommentBody";
import CommentFooter from "../../organisms/CommentFooter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  margin: 3rem;
  padding: 1rem;
  text-align: center;
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const CommentHeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const CommentBodyWrapper = styled.div`
  margin-bottom: 2rem;
`;

const CommentFooterWrapper = styled.div`
  margin-top: 15rem;
`;

function CommentTemplate() {
  return (
    <Wrapper>
      <Left>
        <Img width="100%" height="100%" />
      </Left>
      <Right>
        <CommentHeaderWrapper>
          <CommentHeader />
        </CommentHeaderWrapper>
        <CommentBodyWrapper>
          <CommentBody />
        </CommentBodyWrapper>
        <CommentFooterWrapper>
          <CommentFooter />
        </CommentFooterWrapper>
      </Right>
    </Wrapper>
  );
}

export default CommentTemplate;
