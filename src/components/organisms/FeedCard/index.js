import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Icon, Text, Img } from "../../atoms";
import { FeedHeader } from "../../molecules";

const Container = styled.div`
  max-width: 60rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
  background: ${({ theme }) => theme.colors.white};
`;

const StatusWrapper = styled.div`
  display: flex;
  min-height: 4rem;
`;

const IconWrapper = styled.div`
  display: flex;
  min-width: 7rem;
  justify-content: space-evenly;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  min-width: 18rem;
  justify-content: space-evenly;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  padding: 1rem;
`;

function FeedCard({ ...props }) {
  const mockDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus aliquam ex, ac vulputate purus placerat eget. Integer consectetur...";
  const mockText1 = "10 likes";
  const mockText2 = "10 comments";

  return (
    <Container>
      <FeedHeader />
      <Img width="100%" />
      <StatusWrapper>
        <IconWrapper>
          <Icon icon="likeLine" size="sm" />
          <Icon icon="comment" size="xs" />
        </IconWrapper>
        <TextWrapper>
          <Text text={mockText1} size="base" />
          <Text text={mockText2} size="base" />
        </TextWrapper>
      </StatusWrapper>
      <DescriptionWrapper>
        <Text text={mockDescription} size="base" />
      </DescriptionWrapper>
    </Container>
  );
}

export default FeedCard;
