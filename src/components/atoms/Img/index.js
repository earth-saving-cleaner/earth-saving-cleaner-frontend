import React from "react";

import PropTypes from "prop-types";

function Img({ ...props }) {
  const { alt, src, width, height } = props;

  return <img alt={alt} src={src} width={width} height={height} {...props} />;
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
