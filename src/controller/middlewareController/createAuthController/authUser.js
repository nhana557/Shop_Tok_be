import jwt from '../../../utils/jwt.js';
import bcrypt from '../../../utils/bcrypt.js';

const authUser = async (req, res, { user, databasePassword, password }) => {
	const isMatch = bcrypt.comparePass(password, databasePassword);
	if (!isMatch)
		return res.status(403).json({
			success: false,
			result: null,
			message: 'invalid credentials',
		});

	const payload = {
		id: user.id,
		email: user.email,
		role: user.role,
	};
	const token = jwt.generateToken({ payload });
	const refreshToken = jwt.generateTokenRefreshToken({ payload });

	return res
		.status(200)
		.cookie('token', token, {
			maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
			sameSite: 'Lax',
			httpOnle: true,
			secure: false,
			domain: req.hostname,
			path: '/',
			Partitioned: true,
		})
		.json({
			success: true,
			result: {
				user,
				token,
				refreshToken,
			},
			message: 'Successfully login user',
		});
};

export default authUser;
