import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 60%;
  text-align: center;
  margin: 3rem;
`;

const Left = styled.div`
  width: 40%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;

function MyPageGrid({ leftSide, rightSide, rightSideTitle }) {
  return (
    <Wrapper>
      <Left>{leftSide}</Left>
      <Right>
        <Title>{rightSideTitle}</Title>
        {rightSide}
      </Right>
    </Wrapper>
  );
}

MyPageGrid.propTypes = {
  leftSide: PropTypes.elementType.isRequired,
  rightSide: PropTypes.elementType.isRequired,
  rightSideTitle: PropTypes.elementType.isRequired,
};

export default MyPageGrid;
