import { prisma } from "../../database/prismaClient.js";

/** @argument comment  {{comment: string, promotionId: string, userId: string}} */
export const createCommentProvider = async (comment) => {

	try {
		const comments = await prisma.comments.create({
			data: comment,
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
			return new Error("Error ao criar comentario.");
		}

		return comments;

	} catch (error) {
		console.log(`ERROR CREATE COMMENT: ${error}`);
		return new Error("Error ao criar comentario.");
	} finally {
		await prisma.$disconnect();
	}
};