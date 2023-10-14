import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getPromotionByIdProvider } from "../../provider/Promotions/getPromotionByIdProvider.js";

const validate = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25),
});

export const validateReqGetPromotionById = validateData("params", validate);

export const getPromotionById = async (req, res) => {
    
	const result = await getPromotionByIdProvider(String(req.params.id));

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};