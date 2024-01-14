import {prisma} from "../../database/prismaClient.js";
/** @argument userId {string} */

export const authenticateUserProvider = async (userId) => {
	try {
		const verifyUser = await prisma.users.findUnique({
			where: {userId: userId}
		});

		if(!verifyUser) {
			return Error("USER_NOT_EXISTS");
		}

		await prisma.users.update({
			where: {userId: userId},
			data: {userAuthenticated: true}
		});

		return "Usuario autenticado com sucesso.";


	} catch (error) {
		// console.log(`ERROR CREATE USER: ${error}`);
		return new Error("Error ao autenticar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};