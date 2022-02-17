import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import themes from "../../../theme/theme";

const { colors, fontSizes } = themes;

const StyledInput = styled.input`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  border-color: ${(props) => props.borderColor};
`;

function Input({ ...props }) {
  const { placeholder } = props;

  return <StyledInput placeholder={placeholder} {...props} />;
}

Input.propTypes = {
  placeholder: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  borderColor: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "write here...",
  background: colors.white,
  color: colors.black,
  width: "20rem",
  height: "3rem",
  fontSize: fontSizes.base,
  borderColor: colors.purple,
};

export default Input;
