import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../../../theme/theme";

import { Avatar, Button } from "../../atoms";
import { UserLevel, UserPerformance } from "../../molecules";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 60vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function UserInfo({ profileImage, nickname, level, score }) {
  const { colors } = theme;

  return (
    <Wrapper>
      <Avatar src={profileImage} size="lg" />
      <UserLevel size="xl" margin="3rem" nickname={nickname} level={String(level)} />
      <UserPerformance size="xl" margin="3rem" target="Total" count={String(score)} />
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
