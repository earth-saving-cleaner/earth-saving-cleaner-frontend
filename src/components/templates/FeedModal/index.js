import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "../../atoms";
import theme from "../../../theme/theme";
import Portal from "../Portal";
import MainTemplate from "../MainTemplate";

const ModalWrapper = styled.div`
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
  background: ${theme.colors.black};
  opacity: 0.5;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  width: 90rem;
  height: 60rem;
  background: ${theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 5rem;
`;

const StyledButton = styled(Button)`
  width: 6%;

  border: none;
  color: ${theme.colors.white};
  font-size: 3rem;
  background: none;
`;

const Content = styled.div`
  display: flex;
`;

function Modal({ children }) {
  return (
    <Portal wrapperId="Feed-modal-container">
      <ModalWrapper>
        <Background>
          <MainTemplate />
        </Background>
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalWrapper>
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Modal;