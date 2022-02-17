import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import theme from "../../../theme/theme";
import Portal from "../Portal";

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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  width: 90rem;
  height: 60rem;
  background: ${theme.colors.white};
`;

const Content = styled.div`
  display: flex;
`;

function NewFeedModal({ children }) {
  return (
    <Portal>
      <ModalWrapper>
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalWrapper>
    </Portal>
  );
}

NewFeedModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default NewFeedModal;
