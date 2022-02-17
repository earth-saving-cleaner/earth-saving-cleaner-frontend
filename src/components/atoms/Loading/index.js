import React from "react";
import PropTypes from "prop-types";

import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

import theme from "../../../theme/theme";

const Wrapper = styled.div`
  display: flex;
  z-index: 5;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: white;
`;

function Loading({ height, width }) {
  return (
    <Wrapper>
      <BallTriangle height={height} width={width} color={theme.colors.purple} ariaLabel="loading" />
    </Wrapper>
  );
}

Loading.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

Loading.defaultProps = {
  height: 100,
  width: 100,
};

export default Loading;
