import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { TMDBLogo } from "../images/tmdb.svg";

class SearchBox extends Component {
  handleChange(event) {
    event.target.select();
  }

  render() {
    return (
      <div className="search-container nopadding">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-5">
            <a
              href="./"
              title="ReactJS TMDb Movie Search"
              // onclick="ga('send', 'event', 'link', 'internal', 'TMDB logo')"
            >
              <img
                src={require("../images/tmdb.svg").default}
                className="logo"
                alt="The Movie Database"
              />
            </a>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form className="searchbox">
              <input
                ref="search suggestion"
                onClick={this.handleChange}
                className="searchbox__input typeahead form-control"
                type="text"
                placeholder="Search Movie Title..."
                id="q"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SearchBox;
