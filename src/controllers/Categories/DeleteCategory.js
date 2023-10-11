
import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deleteCategoryProvider } from "../../provider/Categories/DeleteCategoryProvider.js";

const validate = yup.object().shape({
	id: yup.number().required().positive().lessThan(1).lessThan(100),
});

export const validateReqDeleteCategory = validateData("params", validate);

export const deleteCategory = async (req, res) => {

	const result = await deleteCategoryProvider(Number(req.params.id));

	if(result instanceof Error) {
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};