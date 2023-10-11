import { prisma } from "../../database/prismaClient.js";

export const createCategoryProvider = async (name) => {
	try {
		const categoryExist = await prisma.categories.findFirst({
			where: {name: name.name},
		});

		if(categoryExist){
			return new Error(`Categoria - '${name.name}' já existe. `);
		}

		const category = await prisma.categories.create({
			data: name
		});

		if(!category){
			return new Error("error ao criar categoria.");
		}

		return category.categoryId;
	} catch (error) {
		// console.log(`ERROR CREATE CATEGORY: ${error}`);
		return new Error("error ao criar categoria.");
	} finally {
		await prisma.$disconnect();
	}
};