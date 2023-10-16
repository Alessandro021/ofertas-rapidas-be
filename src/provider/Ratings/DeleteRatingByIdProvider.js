import { prisma } from "../../database/prismaClient.js";

/** @argument rating  {{ratingId: string, userId: string}} */
export const deleteRatingByIdProvider = async (rating) => {
	try {
		const ratings = await prisma.ratings.delete({
			where: {ratingId: rating?.ratingId, userId: rating.userId},
			select: {
				ratingId: true,
			},
		});

		if(!ratings){
			return new Error("Error ao deletar avaliação.");
		}

		return ratings;

	} catch (error) {
		// console.log(`ERROR DELETE RATING: ${error}`);
		return new Error("Error ao deletar avaliação.");
	} finally {
		await prisma.$disconnect();
	}
};