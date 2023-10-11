import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { createCategoryProvider } from "../../provider/Categories/CreateCategoryProvider.js";

const validate = yup.object().shape({
	name: yup.string().strict().min(3)
});

export const validateReqCreateCategory = validateData("body", validate);

export const createCategory = async (req, res) => {
	const name = await validate.validate(req.body, {stripUnknown: true});

	const result = await createCategoryProvider(name);

	if(result instanceof Error) {
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(201).json({error: false, result: result});
};