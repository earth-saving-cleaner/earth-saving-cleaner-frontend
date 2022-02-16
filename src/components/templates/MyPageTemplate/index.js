import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 100vw;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Right = styled.div``;

const Left = styled.div``;

const Title = styled.div``;

function MyPageTemplate({ leftSide, rightSide, rightSideTitle }) {
  return (
    <Wrapper>
      <Left>{leftSide}</Left>
      <RightWrapper>
        <Title>{rightSideTitle}</Title>
        <Right>{rightSide}</Right>
      </RightWrapper>
    </Wrapper>
  );
}

MyPageTemplate.propTypes = {
  leftSide: PropTypes.elementType.isRequired,
  rightSide: PropTypes.elementType.isRequired,
  rightSideTitle: PropTypes.elementType.isRequired,
};

export default MyPageTemplate;
