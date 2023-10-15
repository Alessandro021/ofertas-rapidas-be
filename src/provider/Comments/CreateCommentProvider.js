import { prisma } from "../../database/prismaClient.js";

/** @argument comment  {{comment: string, promotionId: string, userId: string}} */
export const createCommentProvider = async (comment) => {

	try {

		const user = await prisma.users.findFirst({
			where: {userId: comment.userId},
			select: {
				profile: {
					select: {
						userName: true,
						userSurname: true,
						photo: true,
						userId: true,
					}
				}
			}
		});

		const comments = await prisma.comments.create({
			data: comment,
			select: {
				commentId: true,
				comment: true,
				promotionId: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if(!comments){
			return new Error("Error ao criar comentario.");
		}

		comments.user = user?.profile;

		return comments;

	} catch (error) {
		// console.log(`ERROR CREATE COMMENT: ${error}`);
		return new Error("Error ao criar comentario.");
	} finally {
		await prisma.$disconnect();
	}
};