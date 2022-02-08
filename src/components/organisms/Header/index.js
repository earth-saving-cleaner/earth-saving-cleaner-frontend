import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import logo from "../../../assets/logo.png";
import { Navigation } from "../../molecules";

const StyledHeader = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0rem 1rem;
  z-index: 9;
  background: ${({ theme }) => theme.gradientColor.purple};
`;

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  min-width: 10rem;
`;

const MiddleWrapper = styled.div`
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
      <Wrapper>
        <Logo onClick={props.onClickLogo} />
      </Wrapper>
      <MiddleWrapper>
        <Navigation iconType="feed" isSelected={test} />
        <Navigation iconType="map" />
      </MiddleWrapper>
      <Wrapper>
        <Navigation iconType="createFeed" />
        <Navigation iconType="myPage" />
      </Wrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  onClickLogo: PropTypes.func.isRequired,
};

export default Header;
