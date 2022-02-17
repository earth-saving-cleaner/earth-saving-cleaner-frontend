import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import themes from "../../../theme/theme";

const StyledText = styled.div`
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  font-weight: ${(props) => props.weight};
  color: ${({ theme, color }) => theme.colors[color]};
`;

function Text({ text, size, color, ...props }) {
  return (
    <StyledText size={size} {...props}>
      {text}
    </StyledText>
  );
}

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
  color: PropTypes.string,
};

Text.defaultProps = {
  size: themes.fontSizes.base,
  weight: "normal",
  color: "black",
};

export default Text;
