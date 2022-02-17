import React, { useState } from "react";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import logo from "../../../assets/logo.png";
import { userSliceActions } from "../../../modules/slices/userSlice";
import { Text } from "../../atoms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 82vh;
  margin: 4rem;
`;

const StyledText = styled(Text)`
  padding: 1.2rem;
  font-style: italic;
`;

const StyledGoogleLogin = styled.div`
  padding: 1.2rem;
`;

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 45px;
  height: 45px;
  transform: rotate(-10deg);
  margin-bottom: 2rem;
`;

function LoginPage() {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (googleResponse) => {
    dispatch(userSliceActions.login(googleResponse));
  };

  const handleLoginError = () => {
    setErrorMessage("Login failed. Please try again. Or try another email.");
  };

  return (
    <Container>
      <Logo />
      <StyledText text="Sign in with your account" size="lg" weight="400" />
      <StyledGoogleLogin>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={handleLogin}
          onFailure={handleLoginError}
        />
      </StyledGoogleLogin>
      {errorMessage && <StyledText text={errorMessage} size="lg" weight="400" />}
    </Container>
  );
}

export default LoginPage;
