import { deleteImageProfileProvider } from "../../provider/User/DeleteImageProfileProvider.js";

export const deleteImageProfile = async (req, res) => {

	const userId = req.user?.userId;

	const result = await deleteImageProfileProvider(userId);

	if(result instanceof Error) {
		if(result.message === "PHOTO_NOT_EXIST"){
			return res.status(404).json({error: true, errors: [{error: "Não existe nenhuma foto de perfil."}]});
		}

		if(result.message === "USER_NON_AUTHORIZED"){
			return res.status(401).json({error: true, errors: [{error: "Usuario não autorizado."}]});
		}

		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}


	return res.status(200).json({error: false, result: result});
};