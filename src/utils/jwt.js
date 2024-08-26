import jwt, { decode } from 'jsonwebtoken';

function generateToken({ payload, expires = '24h' }) {
	return jwt.sign(payload, process.env.SECRET_KEY_JWT, {
		expiresIn: expires,
	});
}

function generateTokenRefreshToken({ payload, expires = '15d' }) {
	return jwt.sign(payload, process.env.SECRET_KEY_JWT, {
		expiresIn: expires,
	});
}

function decodedToken(token) {
	try {
		return jwt.verify(token, process.env.SECRET_KEY_JWT);
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new customError('jwt expired', 403);
		}
		if (error instanceof jwt.JsonWebTokenError) {
			throw new customError('invalid token', 401);
		}
		throw error;
	}
}

export default {
	generateToken,
	decodedToken,
	generateTokenRefreshToken,
};
