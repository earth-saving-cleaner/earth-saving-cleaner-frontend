import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

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
  z-index: 10;
  width: 20rem;
  height: 17rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

function QuestResultTemplate({ children }) {
  return (
    <QuestContainer>
      <ResultWrapper>{children}</ResultWrapper>
    </QuestContainer>
  );
}

export default QuestResultTemplate;
