import {prisma} from "../../database/prismaClient.js";
import { encryptPassword } from "../../utils/generateHashEVerifyPassword.js";
import fs from "fs";
import path from "path";


/** @argument user  {{userId: string, photo: string, userName: string, userSurname: string, email: string, password: string }} */

const __dirname = path.resolve();

export const updateProfileUserProvider = async (user) => {
	try {

		let newUser = {};
		let newProfile = {};

		if(user?.password){
			newUser.password = await encryptPassword(user.password);
		}

		if(user?.email){
			newUser.email = user.email;
		}

		if(user?.userName){
			newProfile.userName = user.userName;
		}

		if(user?.userSurname){
			newProfile.userSurname = user.userSurname;
		}

		if(user?.photo){
			newProfile.photo = user.photo;
		}

		const photoExist = await prisma.users.findFirst({
			where: {profile: {userId: user.userId}},
			include: {
				profile: {
					select: {
						photo: true
					}
				}
			}
		});

		const updateUser = await prisma.users.update({
			where: {userId: user.userId},
			data: {
				...newUser,
				profile: {
					update: {
						...newProfile
					}
				}
			},
			select: {
				profile: {
					select: {
						profileId: true,
						userName: true,
						userSurname: true,
						photo: true,
						userId: true,
					}
				},
			}
		});

		if(updateUser){
			if(user?.photo && photoExist.profile.photo){
				const photoPath = path.join(__dirname, `/uploads/profile/${photoExist.profile.photo}`);
				await fs.promises.unlink(photoPath);
			}
			return updateUser;
		}

		return new Error("Error ao atualizar perfil.");

	} catch (error) {
		// console.log(`ERROR UPDATE PROFILE USER: ${error}`);
		return new Error("Error ao atualizar perfil.");
	} finally {
		await prisma.$disconnect();
	}
};