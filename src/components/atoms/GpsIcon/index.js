import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
`;

const Circle = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  background: ${({ theme, color }) => theme.gpsColor[`${color}_background`]};
  box-shadow: ${({ theme, color }) => theme.gpsColor[`${color}_boxshadow`]};
  z-index: 2;
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1.5rem;
  border: 0.5rem solid ${({ theme, color }) => theme.gpsColor[`${color}_border`]};
  background: ${({ theme, color }) => theme.gpsColor[`${color}_inner_background`]};
  box-shadow: 1px 1px 8px 6px ${({ theme, color }) => theme.gpsColor[`${color}_inner_box_shadow`]};
  z-index: 1;
`;

function GpsIcon({ ...props }) {
  return (
    <Container>
      <Circle {...props} />
      <InnerCircle {...props} />
    </Container>
  );
}

GpsIcon.propTypes = {
  color: PropTypes.string,
};

GpsIcon.defaultProps = {
  color: "purple",
};

export default GpsIcon;
