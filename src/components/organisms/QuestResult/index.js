import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Img, Text } from "../../atoms";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledText = styled(Text)`
  padding-top: 3rem;
  font-weight: 700;
`;

function QuestResult({ ...props }) {
  const { result, level } = props;
  const { message, distance } = result;
  const image = message === "success" ? "image/success.jpg" : "image/failure.jpg";
  const resultMessage = message === "success" ? "You got a good job!" : "Please try again in correct position";
  const userLevel = message === "success" ? `Lv.${level}` : "";
  const targetDistance = distance ? `Go closer ${distance}m.` : "";

  return (
    <Wrapper>
      <Img src={image} width="80%" height="50%" />
      <StyledText text={userLevel} size="xxl" />
      <StyledText text={resultMessage} size="xxl" />
      <StyledText text={targetDistance} size="xxl" />
    </Wrapper>
  );
}

QuestResult.propTypes = {
  result: PropTypes.shape({ distance: PropTypes.number, message: PropTypes.string }).isRequired,
  level: PropTypes.number.isRequired,
};

export default QuestResult;
