import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  background: ${(props) => props.background || "white"};
  color: ${(props) => props.color || "palevioletred"};
  font-size: ${(props) => props.fontSize || "1rem"};
  border: ${(props) => props.border || "0.2rem solid palevioletred"};
  margin: ${(props) => props.margin || "0.5rem"};
  padding: ${(props) => props.padding || "0.25rem 1rem"};
  border-radius: ${(props) => props.radius || "0.3rem"};

  &:active {
    background: #999999;
  }
`;

const Button = ({ title, ...props }) => {
  return <StyledButton {...props}>{title}</StyledButton>;
};

Button.propTypes = {
  title: PropTypes.string,
};

export default Button;
