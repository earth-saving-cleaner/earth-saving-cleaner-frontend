import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { Img, Text } from "../../atoms";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledText = styled(Text)`
  padding-top: 3rem;
`;

function Result({ ...props }) {
  const { result } = props;
  const image = result === "success" ? "image/success.jpg" : "image/failure.jpg";
  return (
    <Wrapper>
      <Img src={image} width="80%" height="50%" />
      <StyledText text={result} size="xxl" />
    </Wrapper>
  );
}

Result.propTypes = {
  result: PropTypes.string.isRequired,
};

export default Result;
