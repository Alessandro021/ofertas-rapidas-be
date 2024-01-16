import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { getUserByIdProvider } from "../../provider/User/GetUserByIdProvider.js";

const validate = yup.object().shape({
	userId: yup.string(),
});

export const validateReqgetUserById = validateData("params", validate);

export const getUserById = async (req, res) => {

	const {userId} = await validate.validate(req.params, {stripUnknown: true});
	const result = await getUserByIdProvider(userId);

	if(result instanceof Error){
		if(result.message === "USER_NOT_EXISTS"){
			return res.status(409).json({error: true, message: "Usuario não existe."});
		}
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(200).json({error: false, message: result});
};