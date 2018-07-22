import * as React from 'react';
import {
  connect,
} from 'react-redux';
import clean from 'clean-tagged-string';
import Link from 'react-router';
import axios from 'axios';
import styles from './movie.css';
import {
  fetchMovieActionCreator as fetchMovie,
} from '../../modules/movies';

class Movie extends React.Component {
  componentWillMount() {
    this.fetchMovie(this.props.params.id);
  }

  componentWillUpdate(next) {
    if (this.props.params.id !== next.params.id) {
      this.fetchMovie(next.params.id);
    }
  }

  fetchMovie(id = this.props.id) {
    const query = clean`{
      movie(index:${id}) {
        title,
        cover,
        year,
        starring {
          name
        }
      }
    }`;

    axios.get(`/q?query=${query}`).then((response) => {
      this.props.fetchMovie(response);
    });
  }

  render() {
    const {
      movie = {
        starring: [],
      },
    } = this.props;
    return (
      <div className={styles.movie}>
        <img src={`url(${movie.cover})`} alt={movie.title} />
        <div className={styles.description}>
          <div className={styles.title}>
            {movie.title}
          </div>
          <div className={styles.year}>
            {movie.year}
          </div>
          <div className={styles.starring}>
            {movie.starring.map((actor = {}, index) => (
              <div key={index} className={styles.actor}>
                {actor.name}
              </div>
            ))}
          </div>
        </div>
        <Link to="/movies" className={styles.closeButton}>
          {'<-'}
        </Link>
      </div>
    );
  }
}

export default connect(({ movies }) => ({
  movie: movies.current,
}), fetchMovie)(Movie);
