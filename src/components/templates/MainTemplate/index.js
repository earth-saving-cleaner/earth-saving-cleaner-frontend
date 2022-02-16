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
`;

function MainTemplate({ children, ...props }) {
  return (
    <StyledContainer>
      <Header onClickCreate={props.onClickCreate} onClickModalClose={props.onClickModalClose} />
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContainer>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClickCreate: PropTypes.func,
  onClickModalClose: PropTypes.func,
};

MainTemplate.defaultProps = {
  onClickCreate: noop,
  onClickModalClose: noop,
};

export default MainTemplate;
