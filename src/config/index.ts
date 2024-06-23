import path from 'path';
require('dotenv').config({
	path: path.join(process.cwd(), '.env')
});

export const config = {
	jwtSecret: process.env.JWT_SIGNATURE as string
};
