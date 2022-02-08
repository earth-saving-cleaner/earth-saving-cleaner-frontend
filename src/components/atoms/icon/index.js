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
  if (typeof size === "number") {
    return { width: size, height: size };
  }

  let rem = "5rem";

  switch (size) {
    case "xs":
      rem = "2rem";
      break;
    case "sm":
      rem = "2.5rem";
      break;
    case "md":
      rem = "3.5rem";
      break;
    case "lg":
      rem = "5rem";
      break;
    // no default
  }

  return { width: rem, heigth: rem };
}

const Wrapper = styled.span`
  display: inline-block;
  width: ${(props) => getSize(props.size).width};
  height: ${(props) => getSize(props.size).heigth};

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.stroke};
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
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

Icon.defaultProps = {
  size: "5rem",
  width: "5rem",
  height: "5rem",
  fill: "currentcolor",
  stroke: "currentcolor",
};

export default Icon;

// Use Ex:
// const StyledIcon = styled(Icon)`
//   margin: 15px;
// `;

// <StyledIcon icon="likeFill" size="sm" fill="red" />
