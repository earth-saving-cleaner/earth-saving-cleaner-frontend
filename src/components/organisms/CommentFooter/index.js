import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Textarea, Icon } from "../../atoms";

const StyledIcon = styled(Icon)`
  margin-left: 0.5rem;
`;

const StyledInput = styled(Textarea)`
  width: 80%;
  border-width: 0.1rem;
  border-radius: 1rem;
`;

function CommentFooter({ handleOnSubmit }) {
  return (
    <>
      <StyledInput placeholder="comments" />
      <button type="button" onClick={handleOnSubmit}>
        <StyledIcon icon="saveComment" size="sm" />
      </button>
    </>
  );
}

CommentFooter.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
};

export default CommentFooter;
