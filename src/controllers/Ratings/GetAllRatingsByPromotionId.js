import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getAllRatingsByPromotionIdProvider } from "../../provider/Ratings/GetAllRatingsByPromotionIdProvider.js";

const validate = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25), //promotionId: string
});

export const validateReqGetAllRatingsByPromotionId = validateData("params", validate);

export const getAllRatingsByPromotionId = async (req, res) => {
	
	const {id: promotionId} = await validate.validate(req.params, {stripUnknown: true});

	const result = await getAllRatingsByPromotionIdProvider(promotionId);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};