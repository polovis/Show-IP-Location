import React from "react";
import PropTypes from "prop-types";
// Assets
import classes from "./InfoBox.module.scss";

const InfoBox = ({ children, data }) => {
  return (
    <div className={classes.Wrapper}>
      {typeof children === "function" ? children() : children}
    </div>
  );
};

InfoBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  data: PropTypes.object,
};

export default InfoBox;
