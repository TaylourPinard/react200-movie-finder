import React, { Component } from 'react';
import { updateSearchInput, getMovie } from './searchActions';
import { Link } from 'react-router-dom';

export default class MovieSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchInput(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(updateSearchInput(value));
  }
  
  handleSearch() {
    const { title, dispatch } = this.props;
    dispatch(getMovie(title));
  }

  render() {
    const { value, movies } = this.props;
    return (
      <div>
        <div 
          className='jumbotron text-center'
          style={{ opacity: .9 }}
        >
          <h1 id='appName' >Movie Finder</h1>
        </div>

        <div id='searchBar'>
          <nav className="navbar">
            <form className="form-inline">
              <input 
                className="form-control d-inline w-70 border-secondary"
                id='searchInput'
                type="search" 
                placeholder="Search a movie" 
                aria-label="Search"
                value={ value }
                onChange={ this.handleSearchInput }
              />
              <button 
                className="btn btn-success my-2 my-sm-0" 
                id='searchButton'
                type="button"
                onClick={ this.handleSearch }
              >
                Go!
              </button>
            </form>
          </nav>
        </div>

        {movies.map( (searchedMovie, i) => {
          return (
            <div 
              className="card bg-dark text-white flex-row flex-wrap"
              id='movieList'
              style={{ marginTop: 20 }}
              key={ i }
            >
              <div className="card-header border-0 col-md-4">
                <img src={`${searchedMovie.Poster}`} alt={searchedMovie.Title}/>
              </div>
              <div className="card-block">
                <h4 className="card-title text-center">
                  {searchedMovie.Title}
                </h4>
                <hr/>
                <h5 className="card-text">
                  <strong>Released:</strong>
                </h5>
                <hr/>
                <p>
                  {searchedMovie.Year}
                </p>
                <h5>
                  <strong>Type:</strong>
                </h5>
                <hr/>
                <p>
                  {searchedMovie.Type}
                </p>
              </div>
              <div className='card-footer w-100 '>
                <Link 
                  to={`/movie/${searchedMovie.imdbID}`}
                  className="btn btn-primary float-right"
                >
                  Movie Information
                </Link>
              </div>
            </div>
          )})
        }

      </div>
    )
  }
}