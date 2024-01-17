import { prisma } from "../../database/prismaClient.js";

/** @argument promotionId  {string} */
export const getAllCommentsByPromotionIdProvider = async (promotionId) => {
	try {
		const comments = await prisma.comments.findMany({
			where: {promotionId: promotionId},
			orderBy: {createdAt: "desc"},
			select: {
				commentId: true,
				comment: true,
				userId: true,
				userPhoto: true,
				userName: true,
				userSurname: true,
				promotionId: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if(!comments){
			return new Error("Error ao buscar comentarios.");
		}

		return comments;

	} catch (error) {
		console.log(`ERROR GET COMMENT: ${error}`);
		return new Error("Error ao buscar comentarios.");
	} finally {
		await prisma.$disconnect();
	}
};