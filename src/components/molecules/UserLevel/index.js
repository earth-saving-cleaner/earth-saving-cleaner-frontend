import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { Text } from "../../atoms";

const Wrapper = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  text-align: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  padding: 0.5rem;
`;

function UserLevel({ size, nickname, level, ...props }) {
  return (
    <Wrapper {...props}>
      <StyledText size={size} text={nickname} />
      <StyledText size={size} text={`Lv.${level}`} />
    </Wrapper>
  );
}

UserLevel.propTypes = {
  nickname: PropTypes.string,
  level: PropTypes.string,
  size: PropTypes.string,
};

UserLevel.defaultProps = {
  nickname: "John",
  level: "10",
  size: "base",
};

export default UserLevel;
