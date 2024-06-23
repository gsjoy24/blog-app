import jwt from 'jsonwebtoken';
import { config } from '../config';

const generateToken = (payload: Record<string, unknown>) => {
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1d'
	});

	return token;
};

const decodeToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, config.jwtSecret);
		return decoded;
	} catch (error) {
		throw new Error('Session expired!');
	}
};

const jwtHelpers = {
	generateToken,
	decodeToken
};

export default jwtHelpers;
