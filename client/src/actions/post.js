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

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err,
});

export const addPostSuccess = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS,
  payload: posts,
});
export const getPostSuccess = (post) => ({
  type: GET_POST,
  payload: post,
});

export const deletePostSuccess = (id) => ({
  type: DELETE_POST,
  payload: id,
});

export const addCommentSuccess = (comment) => ({
  type: GET_POST,
  payload: comment,
});

export const deleteCommentSuccess = (comment) => ({
  type: GET_POST,
  payload: comment,
});
export const editCommentSuccess = (comment) => ({
  type: GET_POST,
  payload: comment,
});

export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(`${FORUM_SERVER}/posts`, postData)
    .then((res) => dispatch(addPostSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  return axios
    .get(`${FORUM_SERVER}/posts`)
    .then((res) => dispatch(getPostsSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  return axios
    .get(`${FORUM_SERVER}/posts/${id}`)
    .then((res) => dispatch(getPostSuccess(res.data)))
    .catch((err) => dispatch(getPostSuccess(null)));
};

export const deletePost = (id) => (dispatch) =>
  axios
    .get(`${FORUM_SERVER}/posts/remove/${id}`)
    .then((res) => dispatch(deletePostSuccess(id)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const addLike = (id) => (dispatch) =>
  axios
    .get(`${FORUM_SERVER}/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const removeLike = (id) => (dispatch) =>
  axios
    .get(`${FORUM_SERVER}/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(`${FORUM_SERVER}/posts/comment/${postId}`, commentData)
    .then((res) => dispatch(addCommentSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
};

export const deleteComment = (postId, commentId) => (dispatch) =>
  axios
    .get(`${FORUM_SERVER}/posts/comment/${postId}/${commentId}`)
    .then((res) => dispatch(deleteCommentSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const editComment = (postId, commentId, editCommentData) => (dispatch) =>
  axios
    .post(
      `${FORUM_SERVER}/posts/comment/${postId}/${commentId}/edit`,
      editCommentData
    )
    .then((res) => dispatch(editCommentSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
