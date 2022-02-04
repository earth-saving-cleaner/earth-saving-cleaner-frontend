import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function getSize(size) {
  if (typeof size === "number") {
    return { width: size, height: size };
  }

  let rem = "5rem";

  switch (size) {
    case "xs":
      rem = "2.5rem";
      break;
    case "sm":
      rem = "5rem";
      break;
    case "md":
      rem = "10rem";
      break;
    case "lg":
      rem = "15rem";
      break;
    // no default
  }

  return { width: rem, heigth: rem };
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
  url: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.string,
  height: PropTypes.string,
};

Avatar.defaultProps = {
  url: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
  size: "5rem",
  width: "5rem",
  height: "5rem",
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
