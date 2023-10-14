import { prisma } from "../../database/prismaClient.js";
/** @argument promotionId  {string} */
export const getPromotionByIdProvider = async (promotionId) => {
	try {
		const promotion = await prisma.promotions.findFirst({
			where: {promotionId: promotionId},
			select: {
				_count: true,
				promotionId: true,
				title: true,
				description: true,
				company: true,
				category: {
					select: {
						categoryId: true,
						name: true,
					}
				},
				photo: true,
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

		if(!promotion){
			return {};
		}

		return promotion;
		
	} catch (error) {
		// console.log(`ERROR GET BY ID PROMOTION: ${error}`);
		return new Error("error ao buscar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};