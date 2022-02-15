import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";
import themes from "../../../theme/theme";
import { noop } from "lodash";

const StyledNavigation = styled.div`
  width: 5rem;
  height: 5rem;
  text-align: center;
  line-height: 7rem;

  ${({ isSelected, stroke }) =>
    isSelected &&
    `
    border-bottom: 0.5rem solid ${stroke};
  `}
`;

function Navigation({ onNavClick, ...props }) {
  return (
    <StyledNavigation onClick={onNavClick} {...props}>
      <Icon icon={props.iconType} {...props} />
    </StyledNavigation>
  );
}

Navigation.propTypes = {
  iconType: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  size: PropTypes.string,
  stroke: PropTypes.string,
  onNavClick: PropTypes.func,
};

Navigation.defaultProps = {
  isSelected: false,
  size: "sm",
  stroke: themes.colors.white,
  onNavClick: noop,
};

export default Navigation;
