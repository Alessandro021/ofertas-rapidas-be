import { prisma } from "../../database/prismaClient.js";

export const getAllCategoryProvider = async () => {
	try {
		const category = await prisma.categories.findMany({
			orderBy: {name: "asc"},
			select: {
				categoryId: true,
				name: true,
			}
		});

		if(!category){
			return new Error("error ao buscar categorias.");
		}

		return category;
	} catch (error) {
		// console.log(`ERROR CREATE CATEGORY: ${error}`);
		return new Error("error ao buscar categorias.");
	} finally {
		await prisma.$disconnect();
	}
};