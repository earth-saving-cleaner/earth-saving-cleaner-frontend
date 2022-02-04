import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.width || "7rem"};
  font-size: ${(props) => props.fontSize || "1.5rem"};
  border-radius: ${(props) => props.raduis || "0.5rem"};
  padding: ${(props) => props.padding || "0.5rem"};
  border-width: ${(props) => props.borderWidth || "0.3rem"};
  resize: none;
`;

const Textarea = ({ ...props }) => {
  return <StyledTextarea {...props} />;
};

export default Textarea;
