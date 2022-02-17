import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Button, Img } from "../../atoms";

const QuestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
`;

const StyledButton = styled(Button)`
  display: flex;
  float: right;
  width: 3rem;
  height: 3rem;
  border: 0rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  float: right;
`;

const PloggingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  width: 20rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

const StyledImage = styled(Img)`
  padding: 1rem;
`;

function QuestTemplate({ ...props }) {
  const { image } = props;

  return (
    <QuestContainer>
      <Background />
      <PloggingWrapper>
        <ButtonWrapper>
          <StyledButton onClick={props.onCloseClick} title="X" />
        </ButtonWrapper>
        <StyledImage width="150rem" padding-top="10px" src={image} />
        <Button title="Clean" radius="1rem" onClick={props.onClickCleanButton} />
      </PloggingWrapper>
    </QuestContainer>
  );
}

QuestTemplate.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onClickCleanButton: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default QuestTemplate;
