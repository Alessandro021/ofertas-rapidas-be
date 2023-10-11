import { prisma } from "../../database/prismaClient.js";

export const deleteCategoryProvider = async (categoryId) => {
	try {
		const category = await prisma.categories.delete({
			where: { categoryId: categoryId}
		});

		if(!category){
			return new Error("error ao deletar categoria.");
		}

		return category.categoryId;
	} catch (error) {
		// console.log(`ERROR DELETE CATEGORY: ${error}`);
		return new Error("error ao deletar categoria.");
	} finally {
		await prisma.$disconnect();
	}
};