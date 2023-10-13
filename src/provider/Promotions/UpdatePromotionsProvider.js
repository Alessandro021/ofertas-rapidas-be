import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotion  {{title: string, company: string, url: string, expirationDate: date, categoryId: number, photo: string, userId: string, promotionId: string }} */
export const updatePromotionsProvider = async (promotion) => {

	const deletePhotoPromotion = async () => {
		if(promotion.photo){
			const photoPath = path.join(__dirname, `/uploads/promotion/${promotion.photo}`);
			await fs.promises.unlink(photoPath);
		}
	};

	try {

		const {userId, promotionId, ...newPromotion} = promotion;

		const photoPromotion = await prisma.promotions.findFirst({
			where: {promotionId: promotionId},
			select: {
				photo: true
			}
		});

		const uploadPromotion = await prisma.promotions.update({
			where: {promotionId: promotionId, userId: userId},
			data: {...newPromotion}
		});


		if(uploadPromotion){
			if(promotion?.photo && photoPromotion?.photo){
				const photoPath = path.join(__dirname, `/uploads/promotion/${photoPromotion.photo}`);
				await fs.promises.unlink(photoPath);

			}
			return uploadPromotion;
		}
		deletePhotoPromotion();
		return new Error("Error ao atualizar promoção.");

	} catch (error) {
		console.log(`ERROR UPDATE PROMOTION: ${error}`);
		deletePhotoPromotion();
		return new Error("error ao atualizar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};