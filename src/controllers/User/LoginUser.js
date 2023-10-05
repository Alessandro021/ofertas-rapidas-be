import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { loginUserProvider } from "../../provider/User/LoginUserProvider.js";

const validate = yup.object().shape({
	email: yup.string().email().required().nonNullable().min(6),
	password: yup.string().required().nonNullable().min(8),
});

export const validateReqLoginUser = validateData("body", validate);

export const loginUser = async (req, res) => {
	const user = await validate.validate(req.body, {stripUnknown: true});
	const result = await loginUserProvider(user);

	if(result instanceof Error){
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(200).json({error: false, result: result});
};