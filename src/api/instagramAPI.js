import axios from 'axios';
import routes from '@/data/routes';

const apiClient = axios.create({
  baseURL: routes.INSTAGRAM.BASE,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const instagramFields = [
  'id',
  'caption',
  'media_url',
  'permalink',
  'thumbnail_url',
  'timestamp',
  'media_type',
  'username',
];

/**
 *
 * @module instagramAPI
 *
 */

/**
 *
 * Generate url for request to Instagram API
 * @ignore
 *
 */
const mediaUrl = (token) => `${routes.INSTAGRAM.FEED}/?fields=${instagramFields.join()}&access_token=${token}`;

/**
 *
 * Retrieve Instagram news feed
 * @returns Promise
 * @example instagramAPI.getFeed().then((response) => console.log(response))
 * @author Dominik Niemann <info@dpsg-os.de>
 *
 */
const getFeed = (token) => apiClient.get(mediaUrl(token));

/**
 *
 * Refresh long-lived access token
 * @returns Promise
 * @example instagramAPI.refreshToken().then((response) => console.log(response))
 * @author Dominik Niemann <info@dpsg-os.de>
 *
 */
const refreshToken = (token) => {
  apiClient.get(`${routes.INSTAGRAM.BASE}${routes.INSTAGRAM.REFRESH}${routes.INSTAGRAM.PARAMS.join('')}${token}"`);
};

const exportFunctions = {
  getFeed,
  refreshToken,
};

export default exportFunctions;
