import React from "react";

import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };
  return (
    <StyledContainer>
      <Header
        onClickLogo={handleLogoClick}
        onClickCreate={props.onClickCreate}
        onClickModalClose={props.onClickModalClose}
      />
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
