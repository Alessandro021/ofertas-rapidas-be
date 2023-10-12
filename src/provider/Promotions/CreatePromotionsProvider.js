import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
/** @argument promotion  {{title: string, company: string, url: string, expirationDate: date, categoryId: number, photo: string, userId: string}} */
export const createPromotionsProvider = async (promotion) => {

	const deletePhotoPromotion = async () => {
		if(promotion.photo){
			const photoPath = path.join(__dirname, `/uploads/promotion/${promotion.photo}`);
			await fs.promises.unlink(photoPath);
		}
	};

	try {
		const categoryExist = await prisma.categories.findFirst({
			where: {categoryId: Number(promotion.categoryId)},
		});

		if(!categoryExist) {
			deletePhotoPromotion();
			return new Error(`Error, categoria de id: ${promotion.categoryId} não existe.`);
		}

		const addPromotion = await prisma.promotions.create({
			data: promotion
		});

		if(!addPromotion){
			deletePhotoPromotion();
			return new Error("Error ao criar promoção.");
		}

		return addPromotion;

	} catch (error) {
		console.log(`ERROR CREATE PROMOTION: ${error}`);
		deletePhotoPromotion();
		return new Error("error ao criar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};