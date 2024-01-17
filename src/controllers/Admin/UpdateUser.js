import { updateProfileUserProvider } from "../../provider/User/UpdateProfileUserProvider.js";
import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";


const validateParams = yup.object().shape({
	id: yup.string().strict().required().min(36).max(36), //userId: string
});

const validateBody = yup.object().shape({
	userName: yup.string().optional().min(3),
	userSurname: yup.string().optional().min(3),
	email: yup.string().email().optional().nonNullable().min(6),
	password: yup.string().optional().nonNullable().min(8),
});

export const validateReqUpdateUserParams = validateData("params", validateParams);
export const validateReqUpdateUserBody = validateData("body", validateBody);

export const updateUser = async (req, res) => {

	const {id: userId} = await validateParams.validate(req.params, {stripUnknown: true});

	const user = await validateBody.validate(req.body, {stripUnknown: true});

	user.userId = userId;

	if(req.file){
		user.photo = req.file?.filename;
	}
	const result = await updateProfileUserProvider(user);

	if(result instanceof Error){
		if(result.message === "USER_NOT_FOUND"){
			return res.status(404).json({error: true, errors: [{error: "Usuario não existe."}]});
		}
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};