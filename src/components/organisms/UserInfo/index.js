import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { useSelector } from "react-redux";

import theme from "../../../theme/theme";

import { Button, Text } from "../../atoms";
import { UserHeader } from "../../molecules";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserPerformanceWrapper = styled.div`
  margin: 210px 0 160px 0;
`;

const TodayWrapper = styled.div`
  margin-bottom: 3rem;
`;

const TotalWrapper = styled.div``;

function UserInfo({ profileImage, nickname, level, score }) {
  const { colors } = theme;
  const userInfo = useSelector((state) => state.user.data);
  const mockLevel = 10;

  return (
    <Wrapper>
      <UserHeader nickname={userInfo.nickname} url={userInfo.profileImage} level={`Lv ${String(mockLevel)}`} />
      <UserPerformanceWrapper>
        <TodayWrapper>
          <Text text={`Today ${String(score)}`} size="xxl" />
        </TodayWrapper>
        <TotalWrapper>
          <Text text={`Total ${String(score)}`} size="xxl" />
        </TotalWrapper>
      </UserPerformanceWrapper>
      <Button
        title="Logout"
        background={colors.purple}
        width="10rem"
        height="2rem"
        radius="5rem"
        color={colors.white}
      />
    </Wrapper>
  );
}

UserInfo.propTypes = {
  profileImage: PropTypes.string,
  nickname: PropTypes.string,
  level: PropTypes.number,
  score: PropTypes.number,
};

UserInfo.defaultProps = {
  profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
  nickname: "anonymous",
  level: 0,
  score: 0,
};

export default UserInfo;
