import {prisma} from "../../database/prismaClient.js";
import { encryptPassword } from "../../utils/generateHashEVerifyPassword.js";
/** @argument user  {{userId: string, photo: string, userName: string, userSurname: string, email: string, password: string }} */

export const updateProfileUserProvider = async (user) => {
	try {

		let newUser = {};

		if(user?.password){
			newUser.password = await encryptPassword(user.password);
		}

		if(user?.email){
			newUser.email = user.email;
		}

		if(user?.userName){
			newUser.userName = user.userName;
		}

		if(user?.userSurname){
			newUser.userSurname = user.userSurname;
		}
		const {userId, password, ...rest} = user;
		const profileExists = await prisma.profile.findFirst({
			where: {
				userId: user.userId
			}
		});

		let updateUser = null;


		if(!profileExists) {
			await prisma.profile.create({
				data: {photo: user?.photo, userId: user.userId}
			});
			updateUser = await prisma.users.update({
				where: {userId: user.userId},
				data: {...newUser},
				select: {
					userId: true,
					userName: true,
					userSurname: true,
					profile: true,
					email: true,
					promotion: true,
					rule: true,
					createdAt: true,
					updatedAt: true,
				}
			});
		} else {
			updateUser = await prisma.users.update({
				where: {userId: user.userId},
				data: {
					...newUser,
					profile: {
						update: {
							photo: user.photo
						}
					}
				},
				select: {
					userId: true,
					userName: true,
					userSurname: true,
					profile: true,
					email: true,
					promotion: true,
					rule: true,
					createdAt: true,
					updatedAt: true,
				}
			});
		}

		if(updateUser){
			return updateUser;
		}

		return new Error("Error ao atualizar perfil.");

	} catch (error) {
		console.log(`ERROR UPDATE PROFILE USER: ${error}`);
		return new Error("Error ao atualizar perfil.");
	} finally {
		await prisma.$disconnect();
	}
};