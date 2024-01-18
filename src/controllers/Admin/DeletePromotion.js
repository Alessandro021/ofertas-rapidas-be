import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deletePromotionByIdProvider } from "../../provider/Promotions/DeletePromotionByIdProvider.js";

const validateParams = yup.object().shape({
	userId: yup.string().strict().required().min(36).max(36), //userId
});

const validateBody = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25), //promotionId: string
});

export const validateReqDeletePromotionParams = validateData("params", validateParams);

export const validateReqDeletePromotionBody = validateData("body", validateBody);


export const deletePromotion = async (req, res) => {
	const {userId} = await validateParams.validate(req.params, {stripUnknown: true});

	const promotion = await validateBody.validate(req.body, {stripUnknown: true});
	promotion.userId = userId;

	const result = await deletePromotionByIdProvider(promotion);

	if(result instanceof Error){
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(200).json({error: false, result: result});
};