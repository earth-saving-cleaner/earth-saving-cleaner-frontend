import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Textarea, Icon } from "../../atoms";

const StyledIcon = styled(Icon)`
  margin-left: 1rem;
`;

const StyledInput = styled(Textarea)`
  width: 80%;
  border-width: 0.1rem;
  border-radius: 1rem;
`;

function CommentFooter({ handleCommentSubmit }) {
  return (
    <>
      <StyledInput placeholder="comments" />
      <button type="button" onClick={handleCommentSubmit}>
        <StyledIcon icon="saveComment" size="md" />
      </button>
    </>
  );
}

CommentFooter.propTypes = {
  handleCommentSubmit: PropTypes.func.isRequired,
};

export default CommentFooter;
