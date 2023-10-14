import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotionId  {string} */
export const deletePromotionByIdProvider = async (promotionId) => {
	try {

		await prisma.comments.deleteMany({
			where: {promotionId: promotionId}
		});

		await prisma.ratings.deleteMany({
			where: {promotionId: promotionId}
		});

		const promotion = await prisma.promotions.delete({
			where: {promotionId: promotionId},
		});

		if(promotion){
			if(promotion?.photo){
				const photoPath = path.join(__dirname, `/uploads/promotion/${promotion.photo}`);
				await fs.promises.unlink(photoPath);
			}

			return promotion.promotionId;
		}

		return new Error("error ao deletar promoção.");
		
	} catch (error) {
		// console.log(`ERROR DELETE PROMOTION: ${error}`);
		return new Error("Error ao deletar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};