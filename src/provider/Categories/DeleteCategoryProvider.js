import { prisma } from "../../database/prismaClient.js";
import { deletePhoto } from "../../services/deletePhoto/index.js";

export const deleteCategoryProvider = async (categoryId) => {
	try {

		await prisma.ratings.deleteMany({
			where: {promotion: {categoryId: categoryId}}
		});

		await prisma.comments.deleteMany({
			where: {promotion: {categoryId: categoryId}}
		});

		const promotionsWithPhotos = await prisma.promotions.findMany({
			where: {categoryId: categoryId},
			select: {
				photo: true,
			}
		});

		await prisma.promotions.deleteMany({
			where: {categoryId: categoryId}
		});

		const category = await prisma.categories.delete({
			where: { categoryId: categoryId}
		});

		if(category){
			if(promotionsWithPhotos && promotionsWithPhotos.length > 0){
				await Promise.all(promotionsWithPhotos.map(async photo => 
					await deletePhoto(`/uploads/promotion/${photo.photo}`)
				));
			}
			return category.categoryId;
			
		} else {
			return new Error("error ao deletar categoria.");
		}

	} catch (error) {
		// console.log(`ERROR DELETE CATEGORY: ${error}`);
		return new Error("error ao deletar categoria.");
	} finally {
		await prisma.$disconnect();
	}
};