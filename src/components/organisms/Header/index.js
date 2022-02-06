import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import logo from "../../../assets/logo.png";
import { Navigation } from "../../molecules";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.5rem;
  padding: 0rem 1rem;
  background: ${({ theme }) => theme.gradientColor.purple};
`;

const Container = styled.div`
  display: inline-flex;
  justify-content: space-between;
  min-width: 10rem;
`;

const MiddleContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  min-width: 15rem;
`;

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 35px;
  height: 35px;
  transform: rotate(-10deg);
`;

function Header({ ...props }) {
  const test = true;

  return (
    <StyledHeader>
      <Container>
        <Logo onClikc={props.onClickLogo} />
      </Container>
      <MiddleContainer>
        <Navigation iconType="feed" isSelected={test} />
        <Navigation iconType="map" />
      </MiddleContainer>
      <Container>
        <Navigation iconType="createFeed" />
        <Navigation iconType="myPage" />
      </Container>
    </StyledHeader>
  );
}

Header.propTypes = {
  onClickLogo: PropTypes.func.isRequired,
};

export default Header;
