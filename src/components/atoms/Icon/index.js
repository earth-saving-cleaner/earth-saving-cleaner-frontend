import React from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";

import {
  IoHomeOutline,
  IoMapOutline,
  IoDuplicateOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoCloseOutline,
  IoPaperPlaneOutline,
  IoLocationOutline,
  IoTrashOutline,
  IoTrash,
  IoWalkOutline,
  IoLeafSharp,
} from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import styled from "styled-components";

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
  cursor: pointer;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.stroke};
  }
`;

function Icon({ icon, size, onClickIcon, ...props }) {
  let svg;

  switch (icon) {
    case "feed":
      svg = <IoHomeOutline />;
      break;
    case "map":
      svg = <IoMapOutline />;
      break;
    case "createFeed":
      svg = <IoDuplicateOutline />;
      break;
    case "myPage":
      svg = <IoPersonOutline />;
      break;
    case "save":
      svg = <MdSaveAlt />;
      break;
    case "likeLine":
      svg = <IoHeartOutline />;
      break;
    case "likeFill":
      svg = <IoHeart />;
      break;
    case "comment":
      svg = <IoChatbubbleOutline />;
      break;
    case "send":
      svg = <IoPaperPlaneOutline />;
      break;
    case "location":
      svg = <IoLocationOutline />;
      break;
    case "trashCanLine":
      svg = <IoTrashOutline />;
      break;
    case "trashCanFill":
      svg = <IoTrash />;
      break;
    case "movingPerson":
      svg = <IoWalkOutline />;
      break;
    case "leaf":
      svg = <IoLeafSharp />;
      break;
    case "close":
      svg = <IoCloseOutline />;
      break;
    default:
      svg = <IoHomeOutline />;
  }

  const onClickHandler = () => {
    const { param } = props;

    if (param) {
      onClickIcon(param);
      return;
    }

    onClickIcon();
  };

  return (
    <Wrapper size={size} onClick={onClickHandler} {...props}>
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
  onClickIcon: PropTypes.func,
  param: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
};

Icon.defaultProps = {
  size: "5rem",
  width: "5rem",
  height: "5rem",
  fill: "currentcolor",
  stroke: "currentcolor",
  onClickIcon: noop,
  param: null,
};

export default Icon;
