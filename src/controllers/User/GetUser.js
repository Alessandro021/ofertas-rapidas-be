import { getUserProvider } from "../../provider/User/GetUserProvider.js";


export const getUser = async (req, res) => {

	const userId = req.user.userId;

	const result = await getUserProvider(userId);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};