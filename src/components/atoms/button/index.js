import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import themes from "../../../globalstyle/theme";

const { colors, fontSizes, margins, paddings } = themes;
const CLICK = "click";

const StyledButton = styled.button`
  width: ${(props) => props.width};
  heigth: ${(props) => props.heigth};
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};

  &:active {
    background: ${({ theme }) => theme.opacityColor.purple};
  }
`;

function Button({ title, ...props }) {
  return <StyledButton {...props}>{title}</StyledButton>;
}

Button.propTypes = {
  width: PropTypes.string,
  heigth: PropTypes.string,
  background: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  border: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  radius: PropTypes.string,
};

Button.defaultProps = {
  width: "100px",
  heigth: "20px",
  background: colors.white,
  title: CLICK,
  color: colors.black,
  fontSize: fontSizes.base,
  border: `0.2rem solid ${colors.purple}`,
  margin: margins.small,
  padding: paddings.base,
  radius: "0.3rem",
};

export default Button;
