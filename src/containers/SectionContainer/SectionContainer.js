import React from "react";
import PropTypes from "prop-types";
// Assets

const SectionContainer = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

SectionContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

export default SectionContainer;
