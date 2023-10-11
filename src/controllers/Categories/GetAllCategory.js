import { getAllCategoryProvider } from "../../provider/Categories/GetAllCategoryProvider.js";

export const getAllCategory = async (req,res) => {
	const result = await getAllCategoryProvider();

	if(result instanceof Error) {
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};