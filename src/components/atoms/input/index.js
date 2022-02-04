import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  background: ${(props) => props.background || "white"};
  color: ${(props) => props.color || "black"};
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "30px"};
  border-radius: ${(props) => props.radius || "0px"};
  font-size: ${(props) => props.fontSize || "1.5em"};
  border-color: ${(props) => props.boderColor || "#cfcfcf"};

  ${(props) =>
    props.primary &&
    css`
      color: black;
      background: white;
      border-color: #cfcfcf;
      border-radius: 5px;
    `}
`;
const Input = ({ ...props }) => {
  const { placeholder } = props;

  return <StyledInput placeholder={placeholder} {...props} />;
};

Input.propTypes = {
  placeholder: PropTypes.string,
};

export default Input;
