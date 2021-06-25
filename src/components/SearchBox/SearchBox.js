import React, { Component } from "react";
//Components
import SearchButton from "components/SearchButton/SearchButton";
import ErrorPanel from "components/ErrorPanel/ErrorPanel";
import CircularProgress from "@material-ui/core/CircularProgress";
// Assets
import classes from "./SearchBox.module.scss";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      coordinates: [],
      isLoading: false,
      errorMessage: null,
      showErrorPanel: false,
    };
  }

  async fetchQuery() {
    this.setState({
      isLoading: true,
    });
    try {
      const response = await fetch(
        `http://api.ipstack.com/${this.state.query}?access_key=d381f15a4dc78cbe0bb08614df5d3dcb`
      );

      const data = await response.json();

      if (!response.ok) {
        this.setState({ errorMessage: response.statusText, isLoading: false });
        return;
      }
      const { longitude, latitude } = data;

      (longitude || latitude) ??
        this.setState({
          errorMessage: "Enter Valid URL or IP Address",
          showErrorPanel: true,
          isLoading: false,
        });

      if (longitude && latitude) {
        await this.setState({
          coordinates: [...this.state.coordinates, { longitude, latitude }],
          isLoading: false,
        });

        await localStorage.setItem(
          "coordinates",
          JSON.stringify(this.state.coordinates)
        );

        await this.props.onUpdateLastQueryCoordinates();
      }
    } catch (error) {
      this.setState({ errorMessage: error, isLoading: false });
    }
  }

  handleQuerySearch = (e) => {
    const query = e.target.value.replace(/\s/g, "");

    if (
      !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        query
      )
    ) {
      this.setState({
        errorMessage: "Enter Valid URL or IP Address",
      });
    }

    this.setState({
      query,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchQuery();
    this.setState({
      query: "",
    });
  };

  closeErrorPanel = () => {
    this.setState({
      showErrorPanel: false,
    });
  };

  render() {
    const { query, showErrorPanel, errorMessage, isLoading } = this.state;
    return (
      <div className={classes.Wrapper}>
        <form
          className={classes.Form}
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
        >
          <input
            className={classes.Input}
            placeholder="Enter valid IP or URL address"
            value={query}
            onChange={this.handleQuerySearch}
          />
          <SearchButton />
        </form>
        {showErrorPanel && (
          <ErrorPanel
            errorMessage={errorMessage}
            onClose={this.closeErrorPanel}
          />
        )}
        {isLoading && (
          <ErrorPanel errorMessage="Loading...">
            <CircularProgress style={{ color: "white" }} />
          </ErrorPanel>
        )}
      </div>
    );
  }
}

export default SearchBox;
