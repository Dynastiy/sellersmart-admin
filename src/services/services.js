import product from './product';
import users from './users';
import dashboard from './dashboard'
import response from './response'
import config from './config'
import auth from './auth'

export const services = {
  product,
  users,
  dashboard,
  response,
  config,
  auth
};

// Optionally, if you want to access all services via a single object
export default services;