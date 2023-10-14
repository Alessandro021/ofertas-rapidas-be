import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotionId  {string} */
export const deleteImagePromotionByIdProvider = async (promotionId) => {
	try {
		const photoPromotion = await prisma.promotions.findFirst({
			where: {promotionId: promotionId},
			select: {
				photo: true
			}
		});

		const promotion = await prisma.promotions.update({
			where: {promotionId: promotionId},
			data: {photo: null},
			select: {
				_count: true,
				promotionId: true,
				title: true,
				description: true,
				company: true,
				photo: true,
				category: {
					select: {
						categoryId: true,
						name: true,
					}
				},
				expirationDate: true,
				url: true,
				user: {
					select: {
						profile: {
							select: {
								userId: true,
								userName: true,
								userSurname: true,
								photo: true,
							}
						}
					}
				},
				comments: true,
				rating: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if(promotion){
			if(photoPromotion?.photo){
				const photoPath = path.join(__dirname, `/uploads/promotion/${photoPromotion.photo}`);
				await fs.promises.unlink(photoPath);

			}
			return promotion;
		}

		return new Error("Error ao deletar foto de promoção.");
		
	} catch (error) {
		// console.log(`ERROR DELETAR IMAGE PROMOTION: ${error}`);
		return new Error("Error ao deletar foto de promoção.");
	} finally {
		await prisma.$disconnect();
	}
};