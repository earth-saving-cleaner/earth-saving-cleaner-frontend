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

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  box-sizing: border-box;

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: currentcolor;
  }
`;

function Icon({ icon, ...props }) {
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

  return <Wrapper {...props}>{svg}</Wrapper>;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

Icon.defaultProps = {
  width: 1.2,
  height: 1.2,
};

export default Icon;

// Use Ex:
// const StyledIcon = styled(Icon)`
//   flex: none;
//   margin-right: 50px;
//   border: 1px solid ${palette("grayscale", 0)};
//   border-radius: 50%;
// `;

// <StyledIcon icon="feed" width={48} />
