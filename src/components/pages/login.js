import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";

import Text from "../atoms/text";
import { loginRequestAction } from "../../modules/slices/loginSlice";

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
  const cookies = new Cookies();
  const successData = useSelector((state) => state.login.successData);
  const failData = useSelector((state) => state.login.failureData);

  const handleLogin = (googleResponse) => {
    dispatch(loginRequestAction(googleResponse));
  };

  const handleFailure = (googleResponse) => {
    console.error(googleResponse);
    // error 메시지 화면에 어떻게 노출 할지 협의 필요
  };

  useEffect(() => {
    if (successData) {
      cookies.set("cookie", successData.data.token, { path: "/" });
    }
  }, [successData]);

  return (
    <Wrapper>
      <div id="innerWrapper">
        <StyledText text="Sign in with your account" size="lg" weight="400" />
        <StyledGoogleLogin>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            buttonSize="20px"
            onSuccess={handleLogin}
            onFailure={handleFailure}
          />
        </StyledGoogleLogin>
      </div>
    </Wrapper>
  );
}

export default Login;
