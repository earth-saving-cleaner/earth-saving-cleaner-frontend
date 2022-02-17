import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import theme from "../../../theme/theme";
import Portal from "../Portal";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
  background: #3532328f;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  width: 90rem;
  height: 60rem;
  background: ${theme.colors.white};
`;

const Content = styled.div`
  display: flex;
`;

function NewFeedModalTemplate({ children }) {
  return (
    <Portal>
      <ModalContainer>
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalContainer>
    </Portal>
  );
}

NewFeedModalTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default NewFeedModalTemplate;
