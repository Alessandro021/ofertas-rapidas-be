import * as yup from "yup";
import { createPromotionsProvider } from "../../provider/Promotions/CreatePromotionsProvider.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const validate = yup.object().shape({
	title: yup.string().strict().required().min(3),
	company: yup.string().strict().required().min(3),
	description: yup.string().strict().required().min(3),
	url: yup.string().strict().required().url().min(7),
	expirationDate: yup.date().optional(),
	categoryId: yup.number().required().positive().lessThan(1).lessThan(1000),
});

export const validateReqCreatePromotions = async (req, res, next)=> {
	await validate.validate(req.body, {abortEarly: false})
		.then(() => next())
		.catch(async err => {
			if(req.file?.filename){
				const photoPath = path.join(__dirname, `/uploads/promotion/${req.file?.filename}`);
				await fs.promises.unlink(photoPath);
			}
			res.status(422).json({error: true, errors: err.inner.map(err => ({[err.path]: err.message}))});
		});
};
export const createPromotions = async (req, res) => {

	const userId = req.user?.userId;

	if(!userId) {
		return res.status(500).json({error: true, errors: [{error: "Erro ao criar promoção"}]});
	}

	let promotion = req.body;

	promotion.userId = userId;

	promotion.categoryId = Number(promotion.categoryId);

	if(promotion.expirationDate){
		promotion.expirationDate = new Date(promotion.expirationDate);
	}

	if(req.file){
		promotion.photo = req.file?.filename;
	}
	const result = await createPromotionsProvider(promotion);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(201).json({error: false, result: result});
};