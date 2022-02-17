import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Text } from "../../atoms";

const Wrapper = styled.div`
  display: flex;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  justify-content: center;
`;

function UserPerformance({ size, target, count, ...props }) {
  return (
    <Wrapper {...props}>
      <Text size={size} text={target} />
      <Text size={size} text={count} />
    </Wrapper>
  );
}

UserPerformance.propTypes = {
  target: PropTypes.string,
  count: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.string,
};

UserPerformance.defaultProps = {
  target: "Today",
  count: 10,
  margin: "0rem",
  size: "base",
};

export default UserPerformance;
