import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deletePromotionByIdProvider } from "../../provider/Promotions/DeletePromotionByIdProvider.js";

const validate = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25), //promotionId
});

export const validateReqDeletePromotionById = validateData("params", validate);

export const deletePromotionById = async (req, res) => {

	const {userId} = req.user;

	const promotion = await validate.validate(req.params, {stripUnknown: true});
	
	promotion.userId = userId;
	console.log(promotion);

	const result = await deletePromotionByIdProvider(promotion);

	if(result instanceof Error){
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(200).json({error: false, result: result});
};