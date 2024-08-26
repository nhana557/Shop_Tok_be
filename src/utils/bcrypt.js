import bcrypt from 'bcrypt';

function passHash(password) {
	return bcrypt.hashSync(password, salt);
}

function comparePass(password, passwordHash) {
	return bcrypt.compareSync(password, passwordHash);
}

export default {
	comparePass,
	passHash,
};
