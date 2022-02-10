import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Textarea, Icon } from "../../atoms";

const StyledIcon = styled(Icon)`
  margin-left: 0.5rem;
`;

const StyledInput = styled(Textarea)`
  width: 90%;
  border-width: 0.1rem;
  border-radius: 1rem;
`;

function CommentFooter({ onSubmit }) {
  return (
    <>
      <StyledInput placeholder="comments" />
      <button type="button" onClick={onSubmit}>
        <StyledIcon icon="send" size="sm" />
      </button>
    </>
  );
}

CommentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentFooter;
