import React, { useState } from "react";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { loginSliceActions } from "../../../modules/slices/loginSlice";
import { Text } from "../../atoms";
import { MainTemplate } from "../../templates";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem;
`;

const StyledText = styled(Text)`
  padding: 1.2rem;
  font-style: italic;
`;

const StyledGoogleLogin = styled.div`
  padding: 1.2rem;
`;

function LoginPage() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (googleResponse) => {
    dispatch(loginSliceActions.login(googleResponse));
  };

  const handleLoginError = () => {
    setErrorMessage("Login failed. Please try again. Or try another email.");
  };

  return (
    <MainTemplate>
      <Container>
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
    </MainTemplate>
  );
}

export default LoginPage;
