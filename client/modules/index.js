// 连接所有的action
import {
  combineReducers,
} from 'redux';
import reducer from './movies';

export default combineReducers({
  movies: reducer.movies,
});
