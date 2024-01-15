import {prisma} from "../../database/prismaClient.js";
import crypto from "crypto";
import { encryptPassword } from "../../utils/generateHashEVerifyPassword.js";
import { sendmail } from "../../services/sendmail/index.js";

/** @argument email {string} */


export const recoverPasswordProvider = async (email) => {
	try {
		const verifyUser = await prisma.users.findUnique({
			where: {email: email}
		});

		if(!verifyUser) {
			return Error("USER_NOT_EXISTS");
		}

		const newPassword =  crypto.randomBytes(4).toString("hex");

		const hash = await encryptPassword(newPassword);

		await prisma.users.update({
			where: {userId: verifyUser.userId},
			data: {
				password: hash
			}
		});

		const html = `<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Nova Senha</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Nova Senha Gerada</h1>
                </div>
                <div class="content">
                    <p>Olá,</p>
                    <p>Sua nova senha é: <strong>${newPassword}</strong></p>
                    <p>Por favor, não compartilhe esta senha com ninguém e altere-a após o próximo login.</p>
                </div>
                <div class="footer">
                    <p>Atenciosamente,</p>
                    <p>Equipe Ofertas Rápidas</p>
                </div>
            </div>
        </body>
        </html>`;

		sendmail({to: email, subject: "Recuperação de senha", html: html });

		

		return "A sua nova senha foi enviada para o seu email de cadastro.";


	} catch (error) {
		// console.log(`ERROR CREATE USER: ${error}`);
		return new Error("Error ao autenticar usuario.");
	} finally {
		await prisma.$disconnect();
	}
};