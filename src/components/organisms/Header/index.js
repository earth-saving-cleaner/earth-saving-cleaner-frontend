import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

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
  cursor: pointer;
`;

function Header({ ...props }) {
  const history = useHistory();
  const location = useLocation();
  const [toggleNav, setToggleNav] = useState(true);
  const [toggleRightSide, setToggleRightSide] = useState(false);

  const goMainPage = () => {
    setToggleNav(true);
    history.push("/");
  };

  const goMapPage = () => {
    setToggleNav(false);
    history.push("/map");
  };

  const goNewFeedPageModal = () => {
    setToggleRightSide(true);
    setToggleNav(false);
    history.push("/feed");
  };

  useEffect(() => {
    location.pathname === "/" ? setToggleNav(true) : setToggleNav(false);
  }, [toggleNav]);

  return (
    <StyledHeader>
      <Wrapper>
        <Logo onClick={props.onClickLogo} />
      </Wrapper>
      <MiddleWrapper>
        <Navigation iconType="feed" isSelected={toggleNav} onNavClick={goMainPage} />
        <Navigation iconType="map" isSelected={!toggleNav} onNavClick={goMapPage} />
      </MiddleWrapper>
      <Wrapper>
        <Navigation iconType="createFeed" isSelected={toggleRightSide} onNavClick={goNewFeedPageModal} />
        <Navigation iconType="myPage" />
      </Wrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  onClickLogo: PropTypes.func.isRequired,
};

export default Header;
