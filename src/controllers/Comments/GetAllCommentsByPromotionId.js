import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getAllCommentsByPromotionIdProvider } from "../../provider/Comments/GetAllCommentsByPromotionIdProvider.js";

const validateParams = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25), //promotionId: string
});

export const validateReqGetAllCommentsByPromotionId = validateData("params", validateParams);

export const getAllCommentsByPromotionId = async (req, res) => {

	const {id: promotionId} = await validateParams.validate(req.params, {stripUnknown: true});

	const result = await getAllCommentsByPromotionIdProvider(promotionId);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};