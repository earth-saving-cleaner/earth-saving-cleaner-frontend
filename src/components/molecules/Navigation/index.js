import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";
import themes from "../../../theme/theme";

const StyledNavigation = styled.div`
  width: 5rem;
  text-align: center;

  ${({ isSelected, stroke }) =>
    isSelected &&
    `
    border-bottom: 0.5rem solid;
    border-color: ${stroke};
  `}

  span {
    display: inline-block;
  }
`;

function Navigation({ ...props }) {
  return (
    <StyledNavigation {...props}>
      <Icon icon="feed" {...props} />
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
  size: "md",
  stroke: themes.colors.white,
};

export default Navigation;
