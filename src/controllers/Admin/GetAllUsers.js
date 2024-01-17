import { getAllUsersProvider } from "../../provider/Admin/GetAllUsersProvider.js";

export const getAllusers = async (req, res) => {

	const result = await getAllUsersProvider();

	if(result instanceof Error) {
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};