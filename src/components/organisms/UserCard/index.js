import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, Img, Avatar, Text } from "../../atoms";
import themes from "../../../theme/theme";

const StyledImage = styled(Img)`
  padding: 1rem;
  height: 19rem;
`;

const StyledText = styled(Text)`
  padding: 1rem;
`;

const Header = styled.div`
  position: relative;
  right: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  float: left;
  padding-top: 0.3rem;
  font-style: oblique;
`;

function UserCard({ avatarImage, image, nickname, level, ...props }) {
  return (
    <>
      <Header>
        <Avatar size="sm" url={avatarImage} />
        <StyledText text={nickname} />
        <StyledText text={`Lv.${level}`} />
      </Header>
      <StyledImage src={image} />
      <Button
        background={themes.colors.purple}
        color="white"
        title="Clean"
        radius="1rem"
        onClick={props.onClickCleanButton}
      />
    </>
  );
}

UserCard.propTypes = {
  onClickCleanButton: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,
};

export default UserCard;
