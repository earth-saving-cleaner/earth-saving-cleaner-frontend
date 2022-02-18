import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

function Img({ alt, src, ...props }) {
  return <Image alt={alt} src={src} {...props} />;
}

Img.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Img.defaultProps = {
  alt: "picture",
  src: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  width: "100%",
  height: "100%",
};

export default Img;
