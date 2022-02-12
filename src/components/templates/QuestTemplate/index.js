import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  width: 6%;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 3rem;
  background: none;
  float: right;
`;

const PloggingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  width: 20rem;
  height: 17rem;
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
      <Background>
        <StyledButton onClick={props.onCloseClick} title="X" />
      </Background>
      <PloggingWrapper>
        <StyledImage width="100rem" padding-top="10px" src={image} />
        <Button title="Clean" radius="1rem" onClick={props.onClickCleanButton} />
      </PloggingWrapper>
    </QuestContainer>
  );
}

QuestTemplate.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onClickCleanButton: PropTypes.func.isRequired,
  image: PropTypes.string,
};

QuestTemplate.defaultProps = {
  image: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
};

export default QuestTemplate;
