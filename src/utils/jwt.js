/* eslint-disable no-undef */
import jwt  from "jsonwebtoken";

const { sign, verify} = jwt;

export const generatedToken = (userId) => {
	return sign({userId: userId}, process.env.SECRET_JWT, {expiresIn: "7d"});
};

export const decodedToken = (token) => {
	return verify(token, process.env.SECRET_JWT);
};