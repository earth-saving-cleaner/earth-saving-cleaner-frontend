import styled from "styled-components";

import Img from "../img";

const StyledImg = styled(Img)`
  border-radius: 50%;
`;

const Avatar = ({ ...props }) => {
  return <StyledImg {...props} />;
};

export default Avatar;

// User Ex:
// const StyledAvatar = styled(Avatar)`
//   margin-right: 10px;
// `;

// <StyledAvatar src={user.imageUrl} alt={user.userNickname} />;
