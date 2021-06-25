import React from "react";
import PropTypes from "prop-types";
import Countdown from "react-countdown";
// Assets
import classes from "./ErrorPanel.module.scss";

const COUNTDOWN_TIMEOUT = 3000;

const ErrorPanel = ({ children, errorMessage, onClose }) => {
  return (
    <div className={classes.Wrapper}>
      <Countdown
        date={Date.now() + COUNTDOWN_TIMEOUT}
        onComplete={onClose ?? null}
        renderer={({ seconds }) => (
          <div className={classes.ErrorMessage}>{errorMessage}</div>
        )}
      />
      {typeof children === "function" ? children() : children}
    </div>
  );
};

ErrorPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorPanel;
