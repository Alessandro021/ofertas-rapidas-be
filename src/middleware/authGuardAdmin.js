import { prisma } from "../database/prismaClient.js";
import { decodedToken } from "../utils/jwt.js";


export const authGuardAdmin = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if(!token) {
			return res.status(401).json({error: true, errors: [{error: "Acesso negado!"}]});
		}

		const verified = decodedToken(token);

		if(!verified){
			return res.status(401).json({error: true, errors: [{error: "Token invalido!"}]});
		}

		const user = await prisma.users.findFirst({
			where: {userId: verified.userId},
			select: {
				// password: false,
				userId: true,
				email: true,
				profile: true,
				promotion: true,
				rule: true,
				createdAt: true,
				updatedAt: true, 
			}
		});

		if(!req.user){
			return res.status(401).json({error: true, errors: [{error: "usuario não cadastrado."}]});
		}

		if(user.rule !== "admin"){
			return res.status(401).json({error: true, errors: [{error: "você não é um administrador!"}]});
		}

		req.user = user;
		next();

	} catch (error) {
		console.log(error);
		return res.status(500).json({error: true, errors: [{error: "Usuario não autorizado"}] });
	} finally {
		await prisma.$disconnect();
	}
};