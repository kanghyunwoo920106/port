import React, { Component } from "react";
import SearchBox from "./components/Search";
import Card from "./components/Card";
import $ from "jquery";
import "./styles/main.css";
import axios from "axios";
import Bloodhound from "bloodhound-js/lib/bloodhound";
import typeahead from "corejs-typeahead";
import { Container, Row } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieID: 157336,
    };
  }
  render() {
    return (
      <Container>
        <SearchBox fetchMovieID={this.fetchMovieID.bind(this)} />
        <Card data={this.state} />
      </Container>
    );
  }

  fetchApi(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movieID: data.id,
          original_title: data.original_title,
          tagline: data.tagline,
          overview: data.overview,
          homepage: data.homepage,
          poster: data.poster_path,
          production: data.production_companies,
          production_countries: data.production_countries,
          genre: data.genres,
          release: data.release_date,
          vote: data.vote_average,
          runtime: data.runtime,
          revenue: data.revenue,
          backdrop: data.backdrop_path,
        });
      });
  }

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=0fe165fda5e9fc777b68d30d2806886d`;
    this.fetchApi(url);
  }

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=0fe165fda5e9fc777b68d30d2806886d`;
    this.fetchApi(url);

    let suggests = new Bloodhound({
      datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: `https://api.themoviedb.org/3/search/movie?query=%Query&api_key=0fe165fda5e9fc777b68d30d2806886d`,
        wildcard: "%Query",
        filter: function (movies) {
          return $.map(movies.results, function (movie) {
            return {
              value: movie.original_title,
              id: movie.id,
            };
          });
        },
      },
    });

    suggests.initialize();

    $(".typeahead")
      .typeahead(
        {
          hint: true,
          highlight: true,
          minLength: 1,
        },
        {
          source: suggests.ttAdapter(),
          templates: {
            suggestion: function (data) {
              return `<p>
                <strong>${data.value}</strong>
              </p>`;
            },
          },
        }
      )
      .on(
        "typeahead:selected",
        function (obj, datum) {
          this.fetchMovieID(datum.id);
        }.bind(this)
      );
  }
}
export default App;
