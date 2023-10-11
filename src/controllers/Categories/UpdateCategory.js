import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { updateCategoryProvider } from "../../provider/Categories/UpdateCategoryProvider.js";

const validateParams = yup.object().shape({
	id: yup.number().required().positive().lessThan(1).lessThan(100),
});


const validateBody = yup.object().shape({
	name: yup.string().strict().required().min(3),
});
export const validateReqUpdateCategoryParams = validateData("params", validateParams);
export const validateReqUpdateCategoryBody = validateData("body", validateBody);

export const updateCategory = async (req, res) => {

	const category = {};

	category.categoryId = Number(req.params?.id);
	category.name = req.body?.name;

	const result = await updateCategoryProvider(category);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};