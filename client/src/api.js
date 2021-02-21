import axios from 'axios';
import qs from 'qs';

export const baseURL = 'https://troper.me'
axios.defaults.withCredentials = false;

export const api = axios.create({
    baseURL: baseURL + `/api/`
});

export const getReviewAnalysis = ({token}) => api.get(`reviewAnalysis?token=${token}`);

export const getTrend = ({token, productType, category}) => api.get(`trendAnalysis?token=${token}&category=${category}&product_type=${productType}`);

export const getKeyword = ({token, productType, category}) => api.get(`relevantReviews?token=${token}&category=${category}&product_type=${productType}`);