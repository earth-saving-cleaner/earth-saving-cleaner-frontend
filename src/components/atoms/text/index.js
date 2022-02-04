import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.div`
  font-weight: ${(props) => props.weight || "normal"};
`;

function Text({ text, ...props }) {
  return <StyledText {...props}>{text}</StyledText>;
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Text;

// Use Ex:
// const StyledText = styled(Text)`
//   flex: none;
//   margin-right: 50px;
//   font-weight: bold;
//   background: ${({ theme }) => theme.colors.red};
// `;

// <StyledText text="ahah" size="2rem" />
