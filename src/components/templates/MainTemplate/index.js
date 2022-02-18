import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Header } from "../../organisms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  height: calc(100vh - 5rem);
`;

function MainTemplate({ children, onImageFileChange }) {
  return (
    <StyledContainer>
      <Header onImageFileChange={onImageFileChange} />
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContainer>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onImageFileChange: PropTypes.func.isRequired,
};

export default MainTemplate;
