import React from "react";
import styled from "styled-components";

import { Avatar, Text } from "../../atoms";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledWrapper = styled.div`
  display: inline-flex;
  padding: 0.8rem;
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const DeacriptionWrapper = styled.div`
  padding: 1rem;
`;

function CommentHeader({ ...props }) {
  const mockUrl = "https://www.vanillacoding.co/images/team/ken.jpg";
  const mockNickname = "ken";
  const description = `It is a long established fact that a reader will be distracted`;

  return (
    <HeaderContainer>
      <StyledWrapper>
        <Avatar url={mockUrl} size="sm" />
        <TextWrapper>
          <Text text={mockNickname} size="lg" weight="700" />
        </TextWrapper>
      </StyledWrapper>
      <DeacriptionWrapper>
        <Text text={description} size="lg" weight="500" />
      </DeacriptionWrapper>
    </HeaderContainer>
  );
}

export default CommentHeader;
