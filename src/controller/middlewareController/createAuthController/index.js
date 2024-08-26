import login from './login.js';

const createAuthMiddleware = (userModel) => {
	let authMethod = {};

	authMethod.login = (req, res) => {
		login(req, res, {
			userModel,
		});
	};

	return authMethod;
};

export default createAuthMiddleware;
