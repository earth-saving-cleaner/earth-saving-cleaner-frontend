import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import themes from "../../../theme/theme";

const StyledText = styled.div`
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  font-weight: ${(props) => props.weight};
`;

function Text({ text, size, ...props }) {
  return (
    <StyledText size={size} {...props}>
      {text}
    </StyledText>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
};

Text.defaultProps = {
  size: themes.fontSizes.base,
  weight: "normal",
};

export default Text;

// Use Ex:
// const StyledText = styled(Text)`
//   margin: 15px;
// `;

// <StyledText text="textTest" size="titleSize" weight="200" />
