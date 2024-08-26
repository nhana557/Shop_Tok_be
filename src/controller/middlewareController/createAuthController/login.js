import Joi from 'joi';
import authUser from './authUser.js';

const login = async (req, res, { userModel }) => {
	const { email, password } = req.body;
	console.log({
		email,
		password,
	});
	// validations
	const objectSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const { error, value } = objectSchema.validate({ email, password });
	if (error) {
		return res.status(409).json({
			success: false,
			result: null,
			error: error,
			message: 'Invalid/Missing credentials.',
			errorMessage: error.message,
		});
	}

	const {
		rows: [user],
	} = await userModel.findEmail(email);
	console.log({ user });
	if (!user) {
		return res.status(404).json({
			success: false,
			result: null,
			message: 'No account with this email has been registered.',
		});
	}
	if (user.verify !== true) {
		return res.status(409).json({
			success: false,
			result: null,
			message: 'user not verify',
		});
	}
	authUser(req, res, { user, databasePassword: user.password, password });
};

export default login;
