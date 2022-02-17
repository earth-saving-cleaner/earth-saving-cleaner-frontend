import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import logo from "../../../assets/logo.png";
import { uploadImage, getImageMetadata } from "../../../utils";
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

function Header({ onImageFileChange }) {
  const history = useHistory();
  const location = useLocation();

  const [navStatus, setNavStatus] = useState({});

  const handleLogoClick = () => {
    history.push("/");
  };

  const goMainPage = () => {
    history.push("/");
  };

  const goMapPage = () => {
    history.push("/map");
  };

  const goPloggingPage = () => {
    history.push("/map/plogging");
  };

  const goMyPage = () => {
    history.push("/mypage");
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNavStatus({
          main: true,
          map: false,
          plogging: false,
          user: false,
        });
        break;
      case "/map":
        setNavStatus({
          main: false,
          map: true,
          plogging: false,
          user: false,
        });
        break;
      case "/map/plogging":
        setNavStatus({
          main: false,
          map: false,
          plogging: true,
          user: false,
        });
        break;
      case "/mypage":
        setNavStatus({
          main: false,
          map: false,
          plogging: false,
          user: true,
        });
        break;
      default:
        setNavStatus({
          main: false,
          map: false,
          plogging: false,
          user: false,
        });
    }
  }, [location.pathname]);

  const handleImageChange = async (e) => {
    const urls = await uploadImage(e.target);
    const metaLocations = await getImageMetadata(e.target);

    onImageFileChange({
      urls,
      metaLocations,
    });
  };

  return (
    <StyledHeader>
      <Wrapper>
        <Logo onClick={handleLogoClick} />
      </Wrapper>
      <MiddleWrapper>
        <Navigation iconType="feed" isSelected={navStatus.main} onNavClick={goMainPage} />
        <Navigation iconType="map" isSelected={navStatus.map} onNavClick={goMapPage} />
        <Navigation iconType="location" isSelected={navStatus.plogging} onNavClick={goPloggingPage} />
      </MiddleWrapper>
      <Wrapper>
        <label htmlFor="imgUpload">
          <Navigation iconType="createFeed" />
        </label>
        <Navigation iconType="myPage" onNavClick={goMyPage} />
      </Wrapper>

      <input name="imgUpload" id="imgUpload" type="file" accept="image/*" onChange={handleImageChange} hidden />
    </StyledHeader>
  );
}

Header.propTypes = {
  onImageFileChange: PropTypes.func.isRequired,
};

export default Header;
