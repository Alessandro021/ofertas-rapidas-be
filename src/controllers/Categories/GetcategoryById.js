import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getCategoryByIdProvider } from "../../provider/Categories/GetcategoryByIdProvider.js";

const validate = yup.object().shape({
	id: yup.number().required().moreThan(0).lessThan(1000),
});

export const validateReqGetCategoryById = validateData("params", validate);

export const getCategoryById = async (req, res) => {
    
	const result = await getCategoryByIdProvider(Number(req.params.id));

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};