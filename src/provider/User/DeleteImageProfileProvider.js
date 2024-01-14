import { prisma } from "../../database/prismaClient.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const deleteImageProfileProvider = async (userId) => {
	try {
		const photoExist = await prisma.users.findFirst({
			where: {profile: {userId: userId}},
			include: {
				profile: {
					select: {
						photo: true
					}
				}
			}
		});

		if(!photoExist.profile.photo){
			return Error("PHOTO_NOT_EXIST");
		}

		if(photoExist?.userId !== userId){
			return Error("USER_NON_AUTHORIZED");
		}

		const photoDeleted = await prisma.profile.update({
			where: {userId: userId},
			data: {
				photo: null,
			},
			select: {
				user: {
					select: {
						userId: true,
						email: true,
						profile: true,
						promotion: true,
						rule: true,
						createdAt: true,
						updatedAt: true 
					}
				}
			}
		});

		if(photoDeleted){
			const photoPath = path.join(__dirname, `/uploads/profile/${photoExist.profile.photo}`);
			await fs.promises.unlink(photoPath);
			return photoDeleted;
		}

		return Error("Error ao deletar foto de perfil");

	} catch (error) {
		console.log(`ERROR DELETE PHOTO PROFILE: ${error}`);
		return Error("Error ao deletar foto de perfil");
	} finally {
		await prisma.$disconnect();
	}
};