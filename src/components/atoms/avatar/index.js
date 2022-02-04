import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImg = styled.img`
  border-radius: 50%;
`;

function Avatar({ url, ...props }) {
  return <StyledImg {...props} src={url} />;
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Avatar;

// User Ex:
// const StyledAvatar = styled(Avatar)`
//   width: 100px;
//   height: 100px;
//   margin: 15px;
//   background: ${({ theme }) => theme.colors.white};
// `;

// <StyledAvatar
//   alt="userImage"
//   url="https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c"
// />
