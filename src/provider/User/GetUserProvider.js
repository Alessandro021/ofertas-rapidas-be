import {prisma} from "../../database/prismaClient.js";

export const getUserProvider = async (userId) => {
	try {
		const user = await prisma.users.findFirst({
			where: {userId: userId},
			select: {
				userId: true,
				email: true,
				rule: true,
				profile: true,
				_count: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if(!user){
			return new Error("Usuario nao encontrado.");
		}

		return user;


	}  catch (error) {
		// console.log(`ERROR LOGIN USER: ${error}`);
		return new Error("Error ao buscar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};