import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { Img, Text } from "../../atoms";

const Wrapper = styled.div``;

function Result({ ...props }) {
  const { result, image } = props;
  return (
    <Wrapper>
      <Img src={image} />
      <Text text={result} />
    </Wrapper>
  );
}

Result.propTypes = {
  result: PropTypes.string.isRequired,
};

export default Result;
