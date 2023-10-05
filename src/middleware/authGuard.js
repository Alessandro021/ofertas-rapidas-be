import { prisma } from "../database/prismaClient.js";
import { decodedToken } from "../utils/jwt.js";


export const authGuard = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if(!token) {
			return res.status(401).json({error: true, message: "Acesso negado!"});
		}

		const verified = decodedToken(token);

		if(!verified){
			return res.status(401).json({error: true, message: "Token invalido!"});
		}

		req.user = await prisma.users.findFirst({
			where: {userId: verified.userId},
			select: {
				// password: false,
				userId: true,
				email: true,
				userName: true,
				userSurname: true,
				profile: true,
				promotion: true,
				rule: true,
				createdAt: true,
				updatedAt: true, 
			}
		});

		next();


	} catch (error) {
		// console.log(error);
		return res.status(500).json({error: true, message: "Usuario não autorizado"});
	} finally {
		await prisma.$disconnect();
	}
};