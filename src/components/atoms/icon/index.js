import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  IoHomeOutline,
  IoHome,
  IoHomeSharp,
  IoMapOutline,
  IoMap,
  IoMapSharp,
  IoDuplicateOutline,
  IoDuplicate,
  IoDuplicateSharp,
  IoPersonOutline,
  IoPerson,
  IoPersonSharp,
  IoCloudUploadOutline,
  IoCloudUpload,
  IoCloudUploadSharp,
  IoHeartOutline,
  IoHeart,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoChatbubble,
  IoChatbubbleSharp,
  IoPaperPlaneOutline,
  IoPaperPlane,
  IoPaperPlaneSharp,
  IoLocationOutline,
  IoLocation,
  IoLocationSharp,
  IoTrashOutline,
  IoTrash,
  IoTrashSharp,
  IoWalkOutline,
  IoWalk,
  IoWalkSharp,
} from "react-icons/io5";

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

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  width: ${(props) => getSize(props.size).width};
  heigth: ${(props) => getSize(props.size).heigth};
  box-sizing: border-box;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.fill || "currentcolor"};
    stroke: ${(props) => props.stroke || "currentcolor"};
  }
`;

// stroke: 도형 선의 색상을 지정하는 속성입니다.

function Icon({ icon, size, ...props }) {
  let svg;

  switch (icon) {
    case "feed":
      svg = <IoHomeOutline />; // <IoHome />; or <IoHomeSharp />;
      break;
    case "map":
      svg = <IoMapOutline />; // <IoMap />; or <IoMapSharp />;
      break;
    case "createFeed":
      svg = <IoDuplicateOutline />; // <IoDuplicate />; or <IoDuplicateSharp />;
      break;
    case "myPage":
      svg = <IoPersonOutline />; // <IoPerson />; or <IoPersonSharp />;
      break;
    case "saveFeed":
      svg = <IoCloudUploadOutline />; // <IoCloudUpload />; or <IoCloudUploadSharp />;
      break;
    case "likeLine":
      svg = <IoHeartOutline />;
      break;
    case "likeFill":
      svg = <IoHeart />; // <IoHeartSharp />;
      break;
    case "comment":
      svg = <IoChatbubbleOutline />; // <IoChatbubble />; or <IoChatbubbleSharp />;
      break;
    case "saveComment":
      svg = <IoPaperPlaneOutline />; // <IoPaperPlane />; or <IoPaperPlaneSharp />;
      break;
    case "location":
      svg = <IoLocationOutline />; // <IoLocation />; or <IoLocationSharp />;
      break;
    case "trashCanLine":
      svg = <IoTrashOutline />;
      break;
    case "trashCanFill":
      svg = <IoTrash />; // <IoTrashSharp />;
      break;
    case "movingPerson":
      svg = <IoWalkOutline />;
      break;
    default:
      console.log("Check icon type!!!");
      svg = <IoHomeOutline />; // <IoHome />; or <IoHomeSharp />;
  }

  return (
    <Wrapper size={size} {...props}>
      {svg}
    </Wrapper>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Icon;

// Use Ex:
// const StyledIcon = styled(Icon)`
//   margin: 15px;
// `;

// <StyledIcon icon="likeFill" size="sm" fill="red" />
