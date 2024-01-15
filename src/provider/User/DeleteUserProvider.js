import { prisma } from "../../database/prismaClient.js";
import { deletePhoto } from "../../services/deletePhoto/index.js";

export const deleteUserProvider = async (userId) => {
	try {
		const userExist = await prisma.users.findFirst({
			where: {userId: userId},
		});

		if(!userExist){
			return Error("USER_NOT_FOUND");
		}

		const promotionsWithPhotos = await prisma.promotions.findMany({
			where: {userId: userId},
			select: {photo: true}
		});


		const profilePhoto = await prisma.profile.findFirst({
			where: {userId: userId},
			select: {photo: true}
		});

		await prisma.comments.deleteMany({
			where: {userId: userId}
		});

		await prisma.ratings.deleteMany({
			where: {userId: userId}
		});

		await prisma.promotions.deleteMany({
			where: {userId: userId},           
		});

		await prisma.profile.delete({
			where: {userId: userId}
		});

		const user = await prisma.users.delete({
			where: {userId: userId}
		});


		if(profilePhoto.photo){
			await deletePhoto(`/uploads/profile/${profilePhoto.photo}`);
		}


		if(promotionsWithPhotos && promotionsWithPhotos.length > 0){
			await Promise.all(promotionsWithPhotos.map(async photo => 
				await deletePhoto(`/uploads/promotion/${photo.photo}`)
			));
		}

		if(user){
			return {userId: user.userId};
		}

		return Error("Error ao deletar usuario.");

	} catch (error) {
		// console.log(`ERROR DELETE PHOTO PROFILE: ${error}`);
		return Error("Error ao deletar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};