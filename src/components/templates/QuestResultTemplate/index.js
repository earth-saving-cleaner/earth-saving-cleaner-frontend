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

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  height: 60%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
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

function QuestResultTemplate({ ...props }) {
  return (
    <QuestContainer>
      <ResultWrapper>
        <ButtonWrapper>
          <StyledButton title="X" onClick={props.onCloseClick} />
        </ButtonWrapper>
        {props.children}
      </ResultWrapper>
    </QuestContainer>
  );
}

QuestResultTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default QuestResultTemplate;
