/* eslint-disable no-undef */
import {prisma} from "../../database/prismaClient.js";
import { sendmail } from "../../services/sendmail/index.js";
import { encryptPassword } from "../../utils/generateHashEVerifyPassword.js";
import "dotenv/config";
/** @argument user  {{userName: string, userSurname: string, email: string, password: string}} */



export const createUserProvider = async (user) => {

	try {
		const verifyUser = await prisma.users.findUnique({
			where: {email: user.email}
		});

		if(verifyUser) {
			return Error("USER_EXISTS");
		}

		const hash = await encryptPassword(user.password);

		const newUser = await prisma.users.create({
			data: {
				email: user.email,
				password: hash,
				profile: {
					create: {
						userName: user.userName,
						userSurname: user.userSurname
					}
				}
			}
		});

		if(!newUser){
			return new Error("Error ao criar usuario.");
		}

		const html = `<!DOCTYPE html>
		<html>
		<head>
		   <title>Verifique sua conta</title>
		   <style>
			   body {
				   font-family: Arial, sans-serif;
			   }
			   .container {
				   width: 80%;
				   margin: auto;
				   background-color: #f8f9fa;
				   padding: 20px;
				   border-radius: 5px;
			   }
			   .header {
				   text-align: center;
				   color: #6c757d;
			   }
			   .button {
				   display: inline-block;
				   background-color: #007bff;
				   color: white;
				   padding: 10px 20px;
				   text-decoration: none;
				   border-radius: 5px;
				   margin-top: 20px;
			   }
		   </style>
		</head>
		<body>
		   <div class="container">
			   <h1 class="header">Bem-vindo à Ofertas Rápidas!</h1>
			   <p>Obrigado por se registrar. Por favor, clique no botão abaixo para verificar sua conta.</p>
			   <a href=${process.env.HOST}/user/authentication/${newUser.userId} class="button">Verificar minha conta</a>
		   </div>
		</body>
		</html>`;

		sendmail({to: user.email, subject: "Validar conta no Ofertas Rapidas", html: html });

		return {userId: newUser.userId};
	} catch (error) {
		// console.log(`ERROR CREATE USER: ${error}`);
		return new Error("Error ao criar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};