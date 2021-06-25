import React, { Component } from "react";
import RoomIcon from "@material-ui/icons/Room";
import MapGL, { Marker } from "react-map-gl";
// Assets
import classes from "./MapBox.module.scss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXJidXN0byIsImEiOiJja3FhMHJrYjEwNDA4Mm9zNjU5NzRhMW8wIn0._jDRDjL_4HWYj2REFGqeng";
class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: undefined,
        longitude: undefined,
        zoom: 14,
        bearing: 0,
        pitch: 0,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setState((state) => {
        state.viewport.latitude = this.props.coordinates.latitude;
        state.viewport.longitude = this.props.coordinates.longitude;
        return state;
      });
    }
  }

  render() {
    const { viewport } = this.state;
    const { latitude, longitude } = viewport;

    return (
      <div className={classes.Wrapper}>
        <div className={classes.MainLabel}>User Location:</div>
        {latitude && longitude && (
          <MapGL
            {...viewport}
            width="100%"
            height="400px"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <RoomIcon color="secondary" />
            </Marker>
          </MapGL>
        )}
      </div>
    );
  }
}

export default MapBox;
