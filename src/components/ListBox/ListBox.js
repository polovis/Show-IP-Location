import React from "react";
import PropTypes from "prop-types";
// Assets
import classes from "./ListBox.module.scss";

const ListBox = ({ children }) => {
  return (
    <div className={classes.Wrapper}>
      <div
        className={classes.MainLabel}
      >{`History of Searched Locations:`}</div>
      {children}
    </div>
  );
};

ListBox.propTypes = {
  children: PropTypes.element,
};

export default ListBox;
