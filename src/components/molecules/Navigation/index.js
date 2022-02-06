import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";
import themes from "../../../theme/theme";

const StyledNavigation = styled.div`
  width: 5rem;
  text-align: center;
  border: 0.5rem solid rgba(255, 255, 255, 0);

  ${({ isSelected, stroke }) =>
    isSelected &&
    `
    border: 0;
    border-bottom: 0.5rem solid;
    border-color: ${stroke};
    border-top: 0.5rem solid rgba(255, 255, 255, 0);
  `}

  span {
    display: inline-block;
  }
`;

function Navigation({ ...props }) {
  return (
    <StyledNavigation {...props}>
      <Icon icon={props.iconType} {...props} />
    </StyledNavigation>
  );
}

Navigation.propTypes = {
  iconType: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  size: PropTypes.string,
  stroke: PropTypes.string,
};

Navigation.defaultProps = {
  isSelected: false,
  size: "sm",
  stroke: themes.colors.white,
};

export default Navigation;
