import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotion  {{userId: string, promotionId: string}} */
export const deletePromotionByIdProvider = async (promotion) => {
	try {
		
		await prisma.comments.deleteMany({
			where: {promotionId: promotion.promotionId, userId: promotion.userId},
		});

		await prisma.ratings.deleteMany({
			where: {promotionId: promotion.promotionId}
		});

		const promotionPhoto = await prisma.promotions.delete({
			where: {promotionId: promotion.promotionId},
			select: {
				promotionId: true,
				photo: true,
			}
		});

		if(promotionPhoto){
			if(promotionPhoto?.photo){
				const photoPath = path.join(__dirname, `/uploads/promotion/${promotionPhoto.photo}`);
				await fs.promises.unlink(photoPath);
			}

			return promotionPhoto.promotionId;
		}

		return new Error("error ao deletar promoção.");
		
	} catch (error) {
		// console.log(`ERROR DELETE PROMOTION: ${error}`);
		return new Error("Error ao deletar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};