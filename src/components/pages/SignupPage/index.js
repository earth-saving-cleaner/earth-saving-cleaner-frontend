import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { userSliceActions } from "../../../modules/slices/userSlice";
import theme from "../../../theme/theme";
import { Text, Input, Button } from "../../atoms";
import { MainTemplate } from "../../templates";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10rem;
`;

const StyledText = styled(Text)`
  padding: 1.2rem;
`;

const StyledInput = styled(Input)`
  width: 30rem;
  height: 30%;
  padding: 10px 20px;
  margin: 5px 0 5px 3px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  display: block;
  width: 30rem;
  height: 30%;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${theme.colors.purple};
  color: ${theme.colors.white};
`;

function SignupPage() {
  const dispatch = useDispatch();
  const {
    data: { email, googleToken },
    error,
  } = useSelector((state) => state.user);

  const [nickname, setNickname] = useState("");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSingupSubmit = () => {
    dispatch(userSliceActions.signup({ googleToken, nickname }));
  };

  return (
    <MainTemplate>
      <Container>
        <StyledText text={email} size="lg" weight="500" />
        {error && error === "duplicatedNickname" && <StyledText text="사용중인 닉네임입니다." size="lg" weight="800" />}
        <StyledInput placeholder="Nickname" value={nickname} onChange={handleNicknameChange} />
        <StyledButton title="Next" onClick={handleSingupSubmit} />
      </Container>
    </MainTemplate>
  );
}

export default SignupPage;
