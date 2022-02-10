import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Img, Icon, Textarea, Input } from "../../atoms";
import { FeedHeader } from "../../molecules";
import themes from "../../../theme/theme";

const { colors } = themes;

const Container = styled.div`
  display: flex;
  width: 90rem;
  height: 60rem;
  background: ${({ theme }) => theme.colors.white};
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50rem;
  height: 100%;
  background: ${({ theme }) => theme.opacityColor.gray};
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 100%;
  padding: 1rem;
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 2rem;
`;

const AddressWrapper = styled.div`
  display: flex;
  width: 90%;
  margin-top: 2rem;
  text-align: right;
`;

const AddressInput = styled(Input)`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_2};
  outline: none;
`;

function NewFeedModal() {
  const imgSrc = "https://www.vanillacoding.co/images/team/ken.jpg";
  return (
    <Container>
      <ImageWrapper>
        <Img alt="feed image" src={imgSrc} />
      </ImageWrapper>
      <ContentsWrapper>
        <CloseWrapper>
          <Icon icon="close" size="md" />
        </CloseWrapper>
        <HeaderWrapper>
          <FeedHeader nickname="Ken" address="Seoul, Korea" url={imgSrc} />
          <Icon icon="save" size="sm" />
        </HeaderWrapper>
        <Textarea background="gray_4" borderWidth={0} radius="0.6rem" width="90%" height="18rem" />
        <AddressWrapper>
          <Icon icon="location" size="md" fill={colors.gray_3} />
          <AddressInput />
        </AddressWrapper>
      </ContentsWrapper>
    </Container>
  );
}

export default NewFeedModal;
