import axios from 'axios';
import ROUTES from '@/data/routes';

export default axios.create({
  baseURL: ROUTES.BASE,
});
