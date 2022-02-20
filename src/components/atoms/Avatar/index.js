import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

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
      rem = "3.5rem";
      break;
    case "md":
      rem = "5rem";
      break;
    case "lg":
      rem = "10rem";
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
  url: "https://lh3.googleusercontent.com/ogw/ADea4I4JcqTQgVPY1LqlhGSA1AE5xeNzqAMXv1NbP2S6=s200-c-mo",
  size: "5rem",
  width: "5rem",
  height: "5rem",
};

export default Avatar;
