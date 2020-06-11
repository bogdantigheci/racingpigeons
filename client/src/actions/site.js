import axios from 'axios';
import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA,
  GET_ERRORS,
} from '../constants/types';

import { SITE_SERVER } from '../components/utils/misc';

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err,
});

export const getSiteDataSucces = (siteData) => ({
  type: GET_SITE_DATA,
  payload: siteData,
});

export const updateSiteDataSuccess = (siteData) => ({
  type: UPDATE_SITE_DATA,
  payload: siteData,
});

export const getSiteData = () => (dispatch) =>
  axios
    .get(`${SITE_SERVER}/site_data`)
    .then((res) => dispatch(getSiteDataSucces(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));

export const updateSiteData = (dataToSubmit) => (dispatch) =>
  axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then((res) => dispatch(updateSiteDataSuccess(res.data)))
    .catch((err) => dispatch(getErrors(err.res.data)));
