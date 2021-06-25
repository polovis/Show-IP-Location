import React from "react";
import PropTypes from "prop-types";
// Assets
import classes from "./SearchButton.module.scss";

const SearchButton = () => {
  return (
    <div className={classes.Wrapper}>
      <button className={classes.Button}>Search</button>
    </div>
  );
};

SearchButton.propTypes = {
  onClick: PropTypes.func,
};

export default SearchButton;
