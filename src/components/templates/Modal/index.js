import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../atoms/button";
import theme from "../../../theme/theme";
import Portal from "../Poral";

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
  width: 80%;
  height: 80%;
  background: ${theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 6%;
  height: 80%;
  border: none;
`;

const Content = styled.div`
  display: flex;
  padding: 1rem;
`;

function Modal({ children, handleClose }) {
  return (
    <Portal wrapperId="modal-container">
      <ModalWrapper>
        <Background />
        <ContentWrapper>
          <ButtonWrapper>
            <StyledButton onClick={handleClose} title="X" />
          </ButtonWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalWrapper>
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
