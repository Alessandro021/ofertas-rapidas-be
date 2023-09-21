import {prisma} from "../../database/prismaClient.js";
/** @argument user  {{userName: string, userSurname: string, email: string, password: string}} */

export const createUserProvider = async (user) => {
	try {
		const verifyUser = await prisma.users.findUnique({
			where: {email: user.email}
		});

		if(verifyUser) {
			return Error("USER_EXISTS");
		}

		const newUser = await prisma.users.create({
			data: {...user}
		});

		if(!newUser){
			return new Error("Error ao criar usuario.");
		}

		return {userId: newUser.userId, token: "123456789"};
	} catch (error) {
		console.log(`ERROR CREATE USER: ${error}`);
		return new Error("Error ao criar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};