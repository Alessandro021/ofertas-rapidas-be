import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getAllPromotionsProvider } from "../../provider/Promotions/GetAllPromotionsProvider.js";

const validate = yup.object().shape({
	page: yup.number().optional().positive().min(1).moreThan(0),
	limit: yup.number().optional().positive().min(1).moreThan(0),
	filter: yup.string().optional().min(1)
});

export const validateReqGetAllPromotions = validateData("query", validate);

export const getAllPromotions = async (req, res) => {
	const get = { 
		page: Number(req.query.page || 1), 
		limit: Number(req.query.limit || 10), 
		filter: String(req.query.filter || "")
	};

	const result = await getAllPromotionsProvider(get);

	if(result instanceof Error) {
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});

};