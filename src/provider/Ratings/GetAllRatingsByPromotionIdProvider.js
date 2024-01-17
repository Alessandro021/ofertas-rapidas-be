import { prisma } from "../../database/prismaClient.js";

/** @argument promotionId  { string} */
export const getAllRatingsByPromotionIdProvider = async (promotionId) => {
	try {
		const ratings = await prisma.ratings.findMany({
			where: {promotionId: promotionId},
			orderBy: {createdAt: "desc"},
			select: {
				ratingId: true,
				rating: true ,
				comment: true,
				userId: true,
				userPhoto: true,
				userName: true,
				userSurname: true,
				promotionId: true,
				createdAt: true,
				updatedAt: true
			},
		});

		if(!ratings){
			return new Error("Error ao buscar avaliações.");
		}

		return ratings;

	} catch (error) {
		console.log(`ERROR GET RATING: ${error}`);
		return new Error("Error ao buscar avaliações.");
	} finally {
		await prisma.$disconnect();
	}
};