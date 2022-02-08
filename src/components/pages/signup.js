import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { signupRequestAction } from "../../modules/slices/signupSlice";

import theme from "../../theme/theme";
import Text from "../atoms/text";
import Input from "../atoms/input";
import Button from "../atoms/button";

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
`;

const StyledInput = styled(Input)`
  width: 150%;
  height: 30%;
  padding: 10px 20px;
  margin: 5px 0 5px 3px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  display: block;
  width: 150%;
  height: 30%;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${theme.colors.purple};
  color: ${theme.colors.white};
`;

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userGoogleInfo, setGoogleUserInfo] = useState("");
  const [resultNotice, setResultNotice] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.loginData);
  const signupData = useSelector((state) => state.signup.signupData);

  useEffect(() => {
    if (loginData) {
      setGoogleUserInfo(loginData.data.googleToken);
      setUserEmail(loginData.data.email);
    }

    if (signupData) {
      if (signupData.data === "exsisting nickname") {
        setResultNotice(true);
      } else {
        setResultNotice(false);
      }
    }
  }, [loginData, signupData]);

  const handleChange = (e) => {
    setResultNotice(false);
    setUserNickname(e.target.value);
  };

  const userInfoDetail = {
    userGoogleInfo,
    userNickname,
  };

  const handleSignup = () => {
    dispatch(signupRequestAction(userInfoDetail));
  };

  return (
    <Wrapper>
      <div id="innerWrapper">
        <StyledText text={userEmail} size="lg" weight="500" />
        {resultNotice && <StyledText text="사용중인 닉네임입니다." size="lg" weight="800" />}
        <StyledInput placeholder="Nickname" value={userNickname} onChange={handleChange} />
        <StyledButton title="Next" onClick={handleSignup} />
      </div>
    </Wrapper>
  );
}

export default Signup;
