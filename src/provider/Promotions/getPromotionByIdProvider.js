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
				comments: {
					orderBy: {updatedAt: "desc"},
					select: {
						commentId: true,
						comment: true,
						promotionId: true,
						userId: true,
						userPhoto: true,
						userName: true,
						userSurname: true,
						createdAt: true,
						updatedAt: true,
					}
				},
				rating: {
					orderBy: {createdAt: "desc"},
					select: {
						ratingId: true,
						rating: true,
						comment: true,
						userId: true,
						userName: true,
						userSurname: true,
						userPhoto: true,
						promotionId: true,
						createdAt: true

					}
				},
				createdAt: true,
				updatedAt: true,
			}
		});

		if(!promotion){
			return {};
		}
		const averageRating = promotion.rating.reduce((accumulator, amount, index, array ) => {
			accumulator = accumulator + amount.rating;

			if(index === array.length - 1){
				return accumulator / array.length;
			}
			return accumulator;
		}, 0);

		promotion._count.averageRating = averageRating;

		return promotion;
		
	} catch (error) {
		console.log(`ERROR GET BY ID PROMOTION: ${error}`);
		return new Error("error ao buscar promoção.");
	} finally {
		await prisma.$disconnect();
	}
};