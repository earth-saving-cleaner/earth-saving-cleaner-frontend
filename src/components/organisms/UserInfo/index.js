import React from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { userSliceActions } from "../../../modules/slices/userSlice";
import theme from "../../../theme/theme";
import { Button, Text } from "../../atoms";
import { UserHeader } from "../../molecules";

const { colors } = theme;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  margin-top: 2rem;
`;

const ScoreWrapper = styled.div`
  margin: 10rem 0 30rem 0;
`;

function UserInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.data);
  const { profileImage, nickname, level, score } = userInfo;

  const handleLoout = () => {
    dispatch(userSliceActions.logout());
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <UserHeader nickname={nickname} url={profileImage} level={`Lv ${level}`} />
      </HeaderWrapper>
      <ScoreWrapper>
        <Text text={`Total ${score}`} size="xxl" />
      </ScoreWrapper>
      <Button
        title="Logout"
        background={colors.purple}
        width="10rem"
        height="2rem"
        radius="5rem"
        color={colors.white}
        onClick={handleLoout}
      />
    </Wrapper>
  );
}

export default UserInfo;
