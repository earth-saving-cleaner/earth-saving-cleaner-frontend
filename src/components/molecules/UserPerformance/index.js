import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Text } from "../../atoms";

const Wrapper = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: flex;
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
