import jwt from 'jsonwebtoken';
import { config } from '../config';

const jwtHelper = (payload: Record<string, unknown>) => {
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1d'
	});

	return token;
};

export default jwtHelper;
