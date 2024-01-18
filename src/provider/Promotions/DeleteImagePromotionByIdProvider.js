import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotionObj {{promotionId: string, userId: string}} */
export const deleteImagePromotionByIdProvider = async ({promotionId, userId}) => {
	try {
		const photoPromotion = await prisma.promotions.findFirst({
			where: {promotionId: promotionId, userId: userId},
		});

		if(!photoPromotion){
			return new Error("Promoção não existe");
		}
		

		if(photoPromotion.photo){
			const promotion = await prisma.promotions.update({
				where: {promotionId: promotionId, userId: userId},
				data: {photo: null},
				
			});

			if(photoPromotion?.photo){
				const photoPath = path.join(__dirname, `/uploads/promotion/${photoPromotion.photo}`);
				await fs.promises.unlink(photoPath);

			} else if(!photoPromotion.photo) {
				return photoPromotion;
			}
			return promotion;
		}
		if(!photoPromotion.photo) {
			return photoPromotion;
		}

		return new Error("Error ao deletar foto de promoção.");
		
	} catch (error) {
		console.log(`ERROR DELETAR IMAGE PROMOTION: ${error}`);
		return new Error("Error ao deletar foto de promoção.");
	} finally {
		await prisma.$disconnect();
	}
};