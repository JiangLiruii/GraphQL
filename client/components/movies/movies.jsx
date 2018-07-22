import * as React from 'react';
import { connect } from 'react-redux';
import clean from 'clean-tagged-string';
import Link from 'react-router';
import axios from 'axios';
import styles from './movies.css';
import { fetchMoviesActionCreator as fetchMovies } from '../../modules/movies';

class Movies extends React.Component {
  componentWillMount() {
    const query = clean`{
      movies {
        title,
        cover
      }
    }`;
    axios.get(`/q?query=${query}`).then(
      (res) => {
        this.props.fetchMovies(res);
      },
    );
  }

  reder() {
    const {
      children,
      movies = [],
      params: { },
    } = this.props;
    return (
      <div className={styles.movies}>
        {movies.map((movie, index) => (
          <Link key={index} to={`/movie/${index + 1}`}>
            <img src={`url(${movie.cover})`} alt={movie.title} />
            {movie.title}
          </Link>
        ))}
        {children}
      </div>
    );
  }
}
export default connect(({ movies }) => ({
  movies: movies.all,
}), fetchMovies)(Movies);
