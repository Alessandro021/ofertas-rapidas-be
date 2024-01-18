import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deleteImagePromotionByIdProvider } from "../../provider/Promotions/DeleteImagePromotionByIdProvider.js";

const validateParams = yup.object().shape({
	userId: yup.string().strict().required().min(36).max(36),
});

const validateBody = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25),
});

export const validateReqDeletePhotoPromotionParams = validateData("params", validateParams);
export const validateReqDeletephotoPromotionBody = validateData("body", validateBody);

export const deletePhotoPromotion = async (req, res) => {
	
	const {userId} = await validateParams.validate(req.params, {stripUnknown: true});
	const {promotionId} = await validateBody.validate(req.body, {stripUnknown: true});

	const result = await deleteImagePromotionByIdProvider({userId, promotionId});

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};