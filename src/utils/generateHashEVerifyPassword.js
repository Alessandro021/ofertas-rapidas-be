import bcrypt from "bcrypt";

const {genSalt, hash, compare} = bcrypt;

const SALT = 10;
export const encryptPassword = async (password) => {
	const saltHash = await genSalt(SALT);
	return await hash(password, saltHash);
};


export const verifyPassword = async (password, hash) => {
	return await compare(password, hash);
};