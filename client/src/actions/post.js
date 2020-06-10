import axios from 'axios';
import { FORUM_SERVER } from '../components/utils/misc';
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
} from '../constants/types';

export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${FORUM_SERVER}/posts`, postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`${FORUM_SERVER}/posts`)
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`${FORUM_SERVER}/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

export const deletePost = (id) => (dispatch) => {
  axios
    .get(`${FORUM_SERVER}/posts/remove/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addLike = (id) => (dispatch) => {
  axios
    .get(`${FORUM_SERVER}/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const removeLike = (id) => (dispatch) => {
  axios
    .get(`${FORUM_SERVER}/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${FORUM_SERVER}/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .get(`${FORUM_SERVER}/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const editComment = (postId, commentId, editCommentData) => (
  dispatch
) => {
  axios
    .post(
      `${FORUM_SERVER}/posts/comment/${postId}/${commentId}/edit`,
      editCommentData
    )
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
