import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import { noop } from "lodash";

import { Textarea, Icon, Text } from "../../atoms";

const Wrapper = styled.div``;

const StyledText = styled(Text)`
  padding-left: 1rem;
  font-size: 2rem;
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
`;

const StyledInput = styled(Textarea)`
  width: 90%;
  border-width: 0.1rem;
  border-radius: 1rem;
`;

function CommentFooter({ ...props }) {
  const { isIconFilled, like } = props;
  return (
    <Wrapper>
      <StatusWrapper>
        <Icon
          size="md"
          icon={isIconFilled ? "likeFill" : "likeLine"}
          onClickIcon={isIconFilled ? noop : props.onClickLikeIcon}
        />
        <StyledText text={`${like} likes`} />
      </StatusWrapper>
      <CommentWrapper>
        <StyledInput placeholder="comments" onChange={props.onChange} value={props.text} />
        <Icon icon="send" size="sm" onClickIcon={props.onSubmit} />
      </CommentWrapper>
    </Wrapper>
  );
}

CommentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
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
