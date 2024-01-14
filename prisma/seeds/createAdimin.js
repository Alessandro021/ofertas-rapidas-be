/* eslint-disable no-undef */
import {prisma} from "../../src/database/prismaClient.js";
import "dotenv/config";
import { encryptPassword } from "../../src/utils/generateHashEVerifyPassword.js";
import { createCategories } from "./createCategories.js";
export const createAdimin = async () => {
	try {
		const adminExist = await prisma.users.findFirst({
			where: {rule: "admin"}
		});

		const userAdimin = {
			email: process.env.ADMIN_USER_EMAIL,
			rule: "admin",
			password: await encryptPassword(process.env.ADMIN_USER_PASSWORD),
		};

		const userAdiminProfile = {
			userName: process.env.ADMIN_USER_NAME,
			userSurname: process.env.ADMIN_USER_SUR_NAME
		};

		if(adminExist) {
			return console.log("Administardor ja esta cadastrado...");
		}

		await prisma.users.create({
			data: {
				...userAdimin,
				profile: {
					create: {
						...userAdiminProfile
					}
				}
			}
		})
			.then(() => console.log("Usuario administrador criado com sucesso!"))
			.catch(error=> error);
        
	} catch (error) {
		// console.log(`ERROR CREATE ADMIN: ${error}`);
		return console.log("Error ao criar administrador.");
	} finally {
		await prisma.$disconnect();
		createCategories();
	}
};