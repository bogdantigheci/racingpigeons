import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
} from '../constants/types';

const initialState = {
  posts: [],
  post: {},
  loading: false,
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case GET_ERRORS:
      return { ...state, errors: [action.payload] };
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
