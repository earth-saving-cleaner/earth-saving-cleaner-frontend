import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { Button } from "../../atoms";

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
  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  float: right;
  background: ${({ theme }) => theme.colors.purple};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const PloggingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  width: 20rem;
  height: 45vh;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  padding-bottom: 1rem;
`;

function QuestTemplate({ ...props }) {
  return (
    <QuestContainer>
      <Background />
      <PloggingWrapper>
        <ButtonWrapper>
          <StyledButton onClick={props.onCloseClick} title="X" />
        </ButtonWrapper>
        {props.children}
      </PloggingWrapper>
    </QuestContainer>
  );
}

QuestTemplate.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onClickCleanButton: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default QuestTemplate;
