import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.div`
  font-size: ${(props) => props.size || "1rem"};
  font-weight: ${(props) => props.weight || "normal"};
`;

const Text = ({ ...props }) => {
  return <StyledText {...props}></StyledText>;
};

Text.PropTypes = {
  fontSize: PropTypes.number,
  fontweigth: PropTypes.number,
};

export default Text;
