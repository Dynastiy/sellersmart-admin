import product from './product';
import users from './users';
import vendor from './vendor'
import response from './response'
import config from './config'
import auth from './auth'

export const services = {
  product,
  users,
  vendor,
  response,
  config,
  auth
};

// Optionally, if you want to access all services via a single object
export default services;