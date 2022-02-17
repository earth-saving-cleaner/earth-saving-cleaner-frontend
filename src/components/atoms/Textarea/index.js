import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import themes from "../../../theme/theme";

const { fontSizes, paddings } = themes;

const StyledTextarea = styled.textarea`
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border-width: ${(props) => props.borderWidth};
  border-radius: ${(props) => props.radius};
  background: ${({ theme, background }) => theme.colors[background]};
  resize: none;
  outline: none;
`;

function Textarea({ ...props }) {
  return <StyledTextarea {...props} />;
}

Textarea.propTypes = {
  width: PropTypes.string,
  heigth: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
  borderWidth: PropTypes.string,
};

Textarea.defaultProps = {
  width: "100%",
  heigth: "100%",
  fontSize: fontSizes.base,
  padding: paddings.xl,
  borderWidth: "0.5rem",
};

export default Textarea;
