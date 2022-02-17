import React from "react";
import { noop } from "lodash";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Textarea, Icon, Text } from "../../atoms";

const Wrapper = styled.div``;

const StyledText = styled(Text)`
  padding-left: 1rem;
  font-size: 1.2rem;
`;

const StatusWrapper = styled.div`
  display: flex;
  min-height: 4rem;
  align-items: center;
  margin-left: 1rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const StyledInput = styled(Textarea)`
  width: 90%;
  margin-right: 1rem;
  border-width: 0.1rem;
  border-radius: 1rem;
  border-color: ${({ theme }) => theme.colors.gray_3};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

function CommentFooter({ isIconFilled, like, onClickLikeIcon, onChangeText, onSubmit, text }) {
  return (
    <Wrapper>
      <StatusWrapper>
        <Icon
          size="xs"
          icon={isIconFilled ? "likeFill" : "likeLine"}
          onClickIcon={isIconFilled ? noop : onClickLikeIcon}
        />
        <StyledText text={`${like} likes`} />
      </StatusWrapper>
      <CommentWrapper>
        <StyledInput placeholder="comments" onChange={onChangeText} value={text} />
        <Icon icon="send" size="xs" onClickIcon={onSubmit} />
      </CommentWrapper>
    </Wrapper>
  );
}

CommentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClickLikeIcon: PropTypes.func.isRequired,
  text: PropTypes.string,
  isIconFilled: PropTypes.bool,
  like: PropTypes.number,
};

CommentFooter.defaultProps = {
  text: "",
  isIconFilled: false,
  like: 0,
};
export default CommentFooter;
