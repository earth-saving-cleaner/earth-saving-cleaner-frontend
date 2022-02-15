import React from "react";

import PropTypes from "prop-types";
import { IoEllipse } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.span`
  display: inline-block;
  width: ${(props) => Number(props.size) * 3}rem;
  height: ${(props) => Number(props.size) * 3}rem;
  cursor: pointer;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.color};
  }
`;

function ClusterCircle({ ...props }) {
  return (
    <Wrapper size={props.size} color={props.color} {...props}>
      <IoEllipse />
    </Wrapper>
  );
}

ClusterCircle.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

ClusterCircle.defaultProps = {
  size: "5",
  color: "green_1",
};

export default ClusterCircle;