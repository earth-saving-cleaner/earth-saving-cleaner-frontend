import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Img, Text } from "../../atoms";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledText = styled(Text)`
  padding-top: 3rem;
`;

function QuestResult({ ...props }) {
  const { result, level } = props;
  const image = result === "success" ? "image/success.jpg" : "image/failure.jpg";
  const resultMessage = result === "success" ? "You got a good job!" : "Please try again in correct position";
  const userLevel = result === "success" ? `Lv.${level}` : "";

  return (
    <Wrapper>
      <Img src={image} width="80%" height="50%" />
      <StyledText text={userLevel} size="xxl" />
      <StyledText text={resultMessage} size="xxl" />
    </Wrapper>
  );
}

QuestResult.propTypes = {
  result: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default QuestResult;
