import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { noop } from "lodash";

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
`;

function MainTemplate({ children, onImageFileChange, ...props }) {
  return (
    <StyledContainer>
      <Header onImageFileChange={onImageFileChange} />
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContainer>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClickCreate: PropTypes.func,
  onClickModalClose: PropTypes.func,
  onImageFileChange: PropTypes.func.isRequired,
};

MainTemplate.defaultProps = {
  onClickCreate: noop,
  onClickModalClose: noop,
};

export default MainTemplate;
