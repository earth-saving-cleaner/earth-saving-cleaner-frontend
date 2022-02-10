import React, { useState } from "react";
import styled from "styled-components";

import Img from "../../atoms/Img";
import CommentHeader from "../../organisms/CommentHeader";
import CommentBody from "../../organisms/CommentBody";
import CommentFooter from "../../organisms/CommentFooter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  height: auto;
`;

const CommentHeaderWrapper = styled.div`
  margin: 1rem 0 0 1rem;
`;

const CommentBodyWrapper = styled.div`
  margin: 2rem 0 22rem 1rem;
`;

const CommentFooterWrapper = styled.div`
  margin-left: 1rem;
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
