import { deleteUserProvider } from "../../provider/User/DeleteUserProvider.js";
import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";

const validate = yup.object().shape({
	id: yup.string().strict().required().min(36).max(36), //userId: string
});

export const validateReqGetAllRatingsByPromotionId = validateData("params", validate);


export const adminDeleteUser = async (req, res) => {

	const {id: userId} = await validate.validate(req.params, {stripUnknown: true});

	const result = await deleteUserProvider(userId);

	if(result instanceof Error) {

		if(result.message === "USER_NOT_FOUND"){
			return res.status(401).json({error: true, errors: [{error: "Usuario não existe."}]});
		}

		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};