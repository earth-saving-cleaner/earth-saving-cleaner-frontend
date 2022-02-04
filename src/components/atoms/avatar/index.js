import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function getSize(size) {
  let width = "5rem";
  let heigth = "5rem";

  switch (size) {
    case "xs":
      width = "2.5rem";
      heigth = "2.5rem";
      break;
    case "sm":
      width = "5rem";
      heigth = "5rem";
      break;
    case "md":
      width = "10rem";
      heigth = "10rem";
      break;
    case "lg":
      width = "15rem";
      heigth = "15rem";
      break;
    default:
      width = `${size}rem`;
      heigth = `${size}rem`;
  }

  return { width, heigth };
}

const StyledImg = styled.img`
  border-radius: 50%;
  width: ${(props) => getSize(props.size).width};
  height: ${(props) => getSize(props.size).heigth};
`;

function Avatar({ url, size, ...props }) {
  return <StyledImg {...props} size={size} src={url} />;
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Avatar;

// Use Ex:
// const StyledAvatar = styled(Avatar)`
//   margin: 15px;
// `;

// <StyledAvatar
//   alt="userImage"
//   size="sm"
//   url="https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c"
// />;
