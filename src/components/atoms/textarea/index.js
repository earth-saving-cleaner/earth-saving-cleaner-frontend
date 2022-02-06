import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import themes from "../../../theme/theme";

const { fontSizes, paddings } = themes;

const StyledTextarea = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  border-width: ${(props) => props.borderWidth};
  resize: none;
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
  width: "300px",
  heigth: "500px",
  fontSize: fontSizes.base,
  padding: paddings.xl,
  borderWidth: "0.5rem",
};

export default Textarea;
