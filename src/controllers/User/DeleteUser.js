import { deleteUserProvider } from "../../provider/User/DeleteUserProvider.js";


export const deleteUser = async (req, res) => {

	const userId = req.user?.userId;

	const result = await deleteUserProvider(userId);

	if(result instanceof Error) {
	

		if(result.message === "USER_NOT_FOUND"){
			return res.status(401).json({error: true, errors: [{error: "Usuario não existe."}]});
		}

		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}


	return res.status(200).json({error: false, result: result});
};