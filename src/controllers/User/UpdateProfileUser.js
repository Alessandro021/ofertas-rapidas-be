import { updateProfileUserProvider } from "../../provider/User/UpdateProfileUserProvider.js";
import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";

const validate = yup.object().shape({
	userName: yup.string().optional().min(3),
	userSurname: yup.string().optional().min(3),
	password: yup.string().optional().nonNullable().min(8),
});

export const validateReqUpdateProfileUser = validateData("body", validate);

export const updateProfileUser = async (req, res) => {

	const userId = req.user?.userId;

	let user = req.body;
	user.userId = userId;

	if(req.file){
		user.photo = req.file?.filename;
	}
	const result = await updateProfileUserProvider(user);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};