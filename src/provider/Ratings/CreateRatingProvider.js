import { prisma } from "../../database/prismaClient.js";

/** @argument rating  {{comment: string, promotionId: string, userId: string, rating: number, userName: string}} */
export const createRatingProvider = async (rating) => {

	try {
		const isRating = await prisma.ratings.findFirst({
			where: {userId: rating.userId}
		});


		if(isRating) {
			return new Error(`${rating.userName} você já avaliou essa promoção.`);
		}

		const ratings = await prisma.ratings.create({
			data: rating,
			select: {
				ratingId: true,
				comment: true,
				rating: true,
				userId: true,
				userPhoto: true,
				userName: true,
				userSurname: true,
				promotionId: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if(!ratings){
			return new Error("Error ao criar avaliação.");
		}

		return ratings;

	} catch (error) {
		console.log(`ERROR CREATE RATING: ${error}`);
		return new Error("Error ao criar avaliação.");
	} finally {
		await prisma.$disconnect();
	}
};