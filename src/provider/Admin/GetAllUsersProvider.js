import { prisma } from "../../database/prismaClient.js";

export const getAllUsersProvider = async () => {
	try {
		const category = await prisma.users.findMany({
			orderBy: {profile: {userName: "asc"}},
			select: {
				userId: true,
				email: true,
				rule: true,
				userAuthenticated: true,
				profile: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if(!category){
			return new Error("error ao buscar usuarios.");
		}

		return category;
	} catch (error) {
		// console.log(`ERROR GET USERs: ${error}`);
		return new Error("error ao buscar ussurios.");
	} finally {
		await prisma.$disconnect();
	}
};