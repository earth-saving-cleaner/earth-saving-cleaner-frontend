import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";

import { loginRequestAction } from "../../modules/slices/loginSlice";

import Text from "../atoms/text";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .innerWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledText = styled(Text)`
  padding: 1.2rem;
  font-style: italic;
`;

const StyledGoogleLogin = styled.div`
  padding: 1.2rem;
`;

function Login() {
  const dispatch = useDispatch();

  const handleLogin = (googleResponse) => {
    dispatch(loginRequestAction(googleResponse));
  };

  return (
    <Wrapper>
      <div id="innerWrapper">
        <StyledText text="Sign in with your account" size="lg" weight="400" />
        <StyledGoogleLogin>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={handleLogin}
          />
        </StyledGoogleLogin>
      </div>
    </Wrapper>
  );
}

export default Login;
