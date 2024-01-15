import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { recoverPasswordProvider } from "../../provider/User/RecoverPasswordProvider.js";
// import { authenticateUserProvider } from "../../provider/User/AuthenticateUserProvider.js";

const validate = yup.object().shape({
	email: yup.string().email().required().nonNullable().min(6),
});

export const validateReqRecoverPassword = validateData("params", validate);

export const recoverPassword = async (req, res) => {

	const {email} = await validate.validate(req.params, {stripUnknown: true});
	const result = await recoverPasswordProvider(email);

	if(result instanceof Error){
		if(result.message === "USER_NOT_EXISTS"){
			return res.status(409).json({error: true, message: "O usuario não esta cadastrado."});
		}
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(200).json({error: false, result: result});
};