import createAuthMiddleware from '../../middlewareController/createAuthController/index.js';
import userModel from '../../../models/users.js';

export default createAuthMiddleware(userModel);
