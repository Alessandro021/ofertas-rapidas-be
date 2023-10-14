import * as yup from "yup";
import { createPromotionsProvider } from "../../provider/Promotions/CreatePromotionsProvider.js";
import fs from "fs";
import path from "path";
import { updatePromotionsProvider } from "../../provider/Promotions/UpdatePromotionsProvider.js";
const __dirname = path.resolve();

const validate = yup.object().shape({
	title: yup.string().strict().optional().min(3),
	company: yup.string().strict().optional().min(3),
	description: yup.string().strict().optional().min(3),
	url: yup.string().strict().optional().url().min(7),
	expirationDate: yup.date().optional(),
	categoryId: yup.number().optional().positive().lessThan(1).lessThan(1000),
	promotionId: yup.string().strict().required().min(25).max(25),
});

export const validateReqUpdatePromotions = async (req, res, next)=> {
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
export const updatePromotions = async (req, res) => {

	const userId = req.user?.userId;

	if(!userId) {
		return res.status(500).json({error: true, errors: [{error: "Erro ao atualizar promoção"}]});
	}

	let promotion = req.body;

	promotion.userId = userId;

	if(promotion?.categoryId){
		promotion.categoryId = Number(promotion.categoryId);
	}

	if(promotion.expirationDate){
		promotion.expirationDate = new Date(promotion.expirationDate);
	}

	if(req.file){
		promotion.photo = req.file?.filename;
	}
	const result = await updatePromotionsProvider(promotion);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};