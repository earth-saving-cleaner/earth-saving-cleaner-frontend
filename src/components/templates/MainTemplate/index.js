import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Header } from "../../organisms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 5rem;
  z-index: 2;
  overflow: auto;
`;

function MainTemplate({ children, ...props }) {
  return (
    <StyledContainer>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContainer>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MainTemplate;
