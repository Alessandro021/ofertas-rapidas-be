import { prisma } from "../../database/prismaClient.js";

/** @argument comment  {{commentId: string, userId: string, promotionId: string}} */
export const deleteCommentByIdProvider = async (comment) => {
	try {
		const comments = await prisma.comments.delete({
			where: {commentId: comment.commentId, userId: comment.userId, promotionId: comment.promotionId},
			select: {
				commentId: true,
			},
		});

		if(!comments){
			return new Error("Error ao deletar comentario.");
		}

		return comments;

	} catch (error) {
		// console.log(`ERROR DELETE COMMENT: ${error}`);
		return new Error("Error ao deletar comentario.");
	} finally {
		await prisma.$disconnect();
	}
};