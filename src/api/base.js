import axios from 'axios';
import ROUTES from '@/data/routes';

export default axios.create({
  baseURL: ROUTES.BASE,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
});
