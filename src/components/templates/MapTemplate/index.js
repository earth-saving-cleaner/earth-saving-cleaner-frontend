import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function MapTemplate({ children }) {
  return (
    <StyledContainer>
      <MapWrapper>{children}</MapWrapper>
    </StyledContainer>
  );
}

MapTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MapTemplate;
