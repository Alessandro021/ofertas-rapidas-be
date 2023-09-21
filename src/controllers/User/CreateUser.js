import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { createUserProvider } from "../../provider/User/CreateUserProvider.js";

const validate = yup.object().shape({
	userName: yup.string().strict().required().min(3),
	userSurname: yup.string().strict().required().min(3),
	email: yup.string().email().required().nonNullable().min(6),
	password: yup.string().required().nonNullable().min(8),
});

export const validateReqCreateUser = validateData("body", validate);

export const cretaeUser = async (req, res) => {
	const user = await validate.validate(req.body, {stripUnknown: true});
	const result = await createUserProvider(user);

	if(result instanceof Error){
		if(result.message === "USER_EXISTS"){
			return res.status(409).json({error: true, message: "Usaurio já existe."});
		}
		return res.status(500).json({error: true, message: result.message});
	}

	return res.status(201).json({error: false, result: result});
};