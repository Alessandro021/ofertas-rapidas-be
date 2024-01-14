import {prisma} from "../../database/prismaClient.js";
import { verifyPassword } from "../../utils/generateHashEVerifyPassword.js";
import { generatedToken } from "../../utils/jwt.js";
/** @argument user  {{email: string, password: string}} */

export const loginUserProvider = async (user) => {
	try {
		const verifyUser = await prisma.users.findFirst({
			where: {email: user.email}
		});

		if(!verifyUser?.email){
			return new Error("Email ou senha estão incorretos.");
		}

		const userExist = await verifyPassword(user.password, verifyUser.password);

		if(userExist){
			if(verifyUser.userAuthenticated){
				return {userId: verifyUser.userId, token: generatedToken(verifyUser.userId)};
			}
			return new Error("Conta ainda não foi autenticada, verifique o seu email");
		}
		return new Error("Email ou senha estão incorretos.");

	} catch (error) {
		// console.log(`ERROR LOGIN USER: ${error}`);
		return new Error("Error ao fazert login.");
	} finally {
		await prisma.$disconnect();
	}
};