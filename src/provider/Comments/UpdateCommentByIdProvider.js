import { prisma } from "../../database/prismaClient.js";

/** @argument comment  {{commentId: string, userId: string, promotionId: string, comment: string}} */
export const updateCommentByIdProvider = async (comment) => {
	try {
		const comments = await prisma.comments.update({
			where: {commentId: comment.commentId, userId: comment.userId, promotionId: comment.promotionId},
			data: {comment: comment.comment},
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
			return new Error("Error ao atualizar comentario.");
		}

		return comments;

	} catch (error) {
		console.log(`ERROR UPDATE COMMENT: ${error}`);
		return new Error("Error ao atualizar comentario.");
	} finally {
		await prisma.$disconnect();
	}
};