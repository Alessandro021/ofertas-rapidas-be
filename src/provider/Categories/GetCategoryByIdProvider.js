import { prisma } from "../../database/prismaClient.js";
/** @argument categoryId  {string} */
export const getCategoryByIdProvider = async (categoryId) => {
	try {
		const promotion = await prisma.categories.findFirst({
			where: {categoryId: categoryId},
			select: {
				categoryId: true,
				name: true,
				promotions: {
					orderBy: {updatedAt: "asc"},
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
				},
				createdAt: true,
				updatedAt: true,
				_count: true
			}

		});

		if(!promotion){
			return {};
		}

		return promotion;
		
	} catch (error) {
		// console.log(`ERROR GET BY ID CATEGORY: ${error}`);
		return new Error("Error ao buscar categoria.");
	} finally {
		await prisma.$disconnect();
	}
};