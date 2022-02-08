import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Avatar, Text } from "../../atoms";

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
`;

function FeedHeader({ ...props }) {
  const mockUrl = "https://www.vanillacoding.co/images/team/ken.jpg";
  const mockNickname = "ken";
  const mockAddress = "Ardyaloon, Western Australia 6725, Australia";

  return (
    <StyledContainer>
      <Avatar url={mockUrl} size="sm" />
      <TextWrapper>
        <Text text={mockNickname} size="lg" weight="700" />
        <Text text={mockAddress} size="base" />
      </TextWrapper>
    </StyledContainer>
  );
}

export default FeedHeader;
