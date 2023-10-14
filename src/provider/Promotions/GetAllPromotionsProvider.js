import { prisma } from "../../database/prismaClient.js";
/** @argument get {{ page: number, limit: number, filter: string}}  */

export const getAllPromotionsProvider = async (get) => {

	const {filter, limit,  page} = get;

	try {
		const count = await prisma.promotions.count({
			where: {
				OR: [
					{
						title: {
							contains: filter,
							mode: "insensitive",
						},
					},
					// {
					// 	company: {
					// 		contains: filter,
					// 		mode: "insensitive",
					// 	},
					// },
				],
			},
			orderBy: { updatedAt: "desc"},

			skip: (page -1) * limit,
			take: limit,
		});

		const promotions = await prisma.promotions.findMany({
			where: {
				OR: [{
					title: {
						contains: filter,
						mode: "insensitive" 
					},
				},
				{
					company: {
						contains: filter,
						mode: "insensitive"
					},
				},
				{
					description: {
						contains: filter,
						mode: "insensitive"  
					}
				}]
			},
			orderBy: { updatedAt: "desc"},

			skip: (page -1) * limit,
			take: limit,

			select: {
				_count: true,
				promotionId: true,
				title: true,
				description: true,
				company: true,
				category: {
					select: {
						categoryId: true,
						name: true,
					}
				},
				photo: true,
				expirationDate: true,
				url: true,
				user: {
					select: {
						profile: {
							select: {
								userId: true,
								userName: true,
								userSurname: true,
								photo: true,
							}
						}
					}
				},
				comments: true,
				rating: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if(!promotions){
			return new Error("Error ao buscar promoções.");
		}

		promotions.forEach((promotion) => {
			promotion._count = { ...promotion._count, promotion: count };
		});

		return promotions;

	} catch (error) {
		// console.log(`ERROR GET ALL PROMOTIONS: ${error}`);
		return new Error("Error ao buscar promoções.");
	} finally {
		await prisma.$disconnect();
	}
};

