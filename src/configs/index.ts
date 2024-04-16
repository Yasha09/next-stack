import 'dotenv/config';

const PORT: number = Number(process.env.PORT) || 8080;

const APP_BASE_URL: string = process.env.APP_BASE_URL || 'http://localhost:3000';

const JWT_SECRET: string = process.env.JWT_SECRET || 'SomePrivateKey';

const JWT_EXPIRATION_DATE: string = process.env.JWT_EXPIRATION_DATE as string;


export default {
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION_DATE,
};
