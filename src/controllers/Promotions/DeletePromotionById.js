import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deletePromotionByIdProvider } from "../../provider/Promotions/DeletePromotionByIdProvider.js";

const validate = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25),
});

export const validateReqDeletePromotionById = validateData("params", validate);

export const deletePromotionById = async (req, res) => {
	const result = await deletePromotionByIdProvider(String(req.params.id));

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};