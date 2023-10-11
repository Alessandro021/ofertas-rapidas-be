import { prisma } from "../../database/prismaClient.js";

export const updateCategoryProvider = async (category) => {
	try {
		const updateCategory = await prisma.categories.update({
			where: {categoryId: category?.categoryId},
			data: {name: category?.name},
			select: {
				categoryId: true,
				name: true		
			}
		});

		if(!updateCategory){
			return new Error("error ao atualizar categoria.");
		}

		return updateCategory;
	} catch (error) {
		// console.log(`ERROR UPDATE CATEGORY: ${error}`);
		return new Error("error ao atualizar categoria.");
	} finally {
		await prisma.$disconnect();
	}
};