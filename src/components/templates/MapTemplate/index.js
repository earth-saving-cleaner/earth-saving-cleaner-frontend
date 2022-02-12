import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Header } from "../../organisms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function MapTemplate({ children }) {
  return (
    <StyledContainer>
      <Header />
      <MapWrapper>{children}</MapWrapper>
    </StyledContainer>
  );
}

MapTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MapTemplate;