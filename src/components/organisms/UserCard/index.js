import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import themes from "../../../theme/theme";
import { Button, Img, Avatar, Text } from "../../atoms";

const StyledImage = styled(Img)`
  width: 80%;
  height: 19rem;
`;

const StyledText = styled(Text)`
  padding-right: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

      <StyledImage src={image} alt="cardImage" />
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
  onClickCleanButton: PropTypes.func,
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
  level: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  avatarImage: PropTypes.string,
};

UserCard.defaultProps = {
  url: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  avatarImage: "https://lh3.googleusercontent.com/ogw/ADea4I4JcqTQgVPY1LqlhGSA1AE5xeNzqAMXv1NbP2S6=s200-c-mo",
  onClickCleanButton: noop,
};

export default UserCard;
