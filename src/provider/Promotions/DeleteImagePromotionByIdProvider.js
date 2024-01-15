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