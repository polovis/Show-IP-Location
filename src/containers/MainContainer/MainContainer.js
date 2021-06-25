import React, { Component } from "react";
import classNames from "classnames";
// Components
import SectionContainer from "containers/SectionContainer/SectionContainer";
import SearchBox from "components/SearchBox/SearchBox";
import MapBox from "components/MapBox/MapBox";
import InfoBox from "components/InfoBox/InfoBox";
import UserInfoBox from "components/UserInfoBox/UserInfoBox";
import ListBox from "components/ListBox/ListBox";
import CircularProgress from "@material-ui/core/CircularProgress";
// Assets
import classes from "./MainContainer.module.scss";
import ErrorPanel from "components/ErrorPanel/ErrorPanel";

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      lastQueryCoordinates: null,
      isLoading: true,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://ip-api.com/json`);

      const data = await response.json();

      if (!response.ok) {
        this.setState({ errorMessage: response.statusText, isLoading: false });
        return;
      }

      this.setState({
        userData: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ errorMessage: error, isLoading: false });
    }
  }

  updateLastQueryCoordinates = () => {
    const coordinates = JSON.parse(localStorage.getItem("coordinates"));

    this.setState({
      lastQueryCoordinates: coordinates,
    });
  };

  render() {
    const { userData, lastQueryCoordinates, isLoading } = this.state;

    const renderListOfAllSearchedLocations = lastQueryCoordinates ? (
      <ul className={classes.List}>
        {this.state.lastQueryCoordinates.map(
          ({ longitude, latitude }, index) => (
            <li key={index}>
              <p>
                <span className={classes.Label}>{`longitude: `}</span>
                {longitude.toFixed(4)}
              </p>
              <p>
                <span className={classes.Label}>{`latitude: `}</span>
                {latitude.toFixed(4)}
              </p>
              <p className={classes.Divider}></p>
            </li>
          )
        )}
      </ul>
    ) : null;

    return (
      <div className={classes.MainWrapper}>
        <a
          href="https://pl.freepik.com/zdjecia/tekstura"
          className={classes.PictureSource}
        >
          Tekstura zdjęcie utworzone przez freepik - pl.freepik.com
        </a>
        <div className={classNames(classes.RightPanel)}>
          <SectionContainer className={classes.UserContainer}>
            <UserInfoBox userData={userData}></UserInfoBox>

            <MapBox
              coordinates={
                userData
                  ? { longitude: userData.lon, latitude: userData.lat }
                  : false
              }
            ></MapBox>
          </SectionContainer>

          <SectionContainer className={classes.SearchContainer}>
            <SearchBox
              onUpdateLastQueryCoordinates={this.updateLastQueryCoordinates}
            />
          </SectionContainer>

          <SectionContainer className={classes.LastSearchContainer}>
            <InfoBox>
              <div className={classes.MainLabel}>
                {`Last Search Coordinates:`}
              </div>
              {lastQueryCoordinates ? (
                <ul className={classes.Detalis}>
                  <li>
                    <span className={classes.Label}>{`longitude: `}</span>

                    {lastQueryCoordinates[
                      lastQueryCoordinates.length - 1
                    ].longitude.toFixed(4)}
                  </li>
                  <li>
                    <span className={classes.Label}>{`latitude: `}</span>
                    {lastQueryCoordinates[
                      lastQueryCoordinates.length - 1
                    ].latitude.toFixed(4)}
                  </li>
                </ul>
              ) : null}
            </InfoBox>
            <MapBox
              coordinates={
                lastQueryCoordinates
                  ? lastQueryCoordinates[lastQueryCoordinates.length - 1]
                  : false
              }
            ></MapBox>
          </SectionContainer>
          <SectionContainer className={classNames(classes.LeftPanel)}>
            <ListBox>{renderListOfAllSearchedLocations}</ListBox>
          </SectionContainer>
        </div>
        {isLoading && (
          <ErrorPanel errorMessage="Loading...">
            <CircularProgress style={{ color: "white" }} />
          </ErrorPanel>
        )}
      </div>
    );
  }
}

export default MainContainer;
