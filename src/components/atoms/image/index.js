import React from "react";
import PropTypes from "prop-types";

const Img = ({ ...props }) => {
  const { alt, src, width, height } = props;

  return <img alt={alt} src={src} width={width} height={height} {...props} />;
};

Img.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Img;
