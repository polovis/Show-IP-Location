import React from "react";
import PropTypes from "prop-types";
// Assets
import classes from "./UserInfoBox.module.scss";

const UserInfoBox = ({ children, userData, data }) => {
  const renderUserDataLocation = () => {
    if (userData) {
      const {
        query: userIP,
        country,
        city,
        lon: longitude,
        lat: latitude,
      } = userData;

      return (
        <>
          <div className={classes.MainLabel}>User Basic Informations:</div>
          <ul className={classes.Detalis}>
            {Object.entries({
              userIP,
              country,
              city,
              longitude,
              latitude,
            }).map(([label, value]) => (
              <li key={label}>
                <span className={classes.Label}>{label}: </span>
                {value}
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return <div className={classes.Wrapper}>{renderUserDataLocation()}</div>;
};

UserInfoBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  userData: PropTypes.object,
  data: PropTypes.object,
};

export default UserInfoBox;
