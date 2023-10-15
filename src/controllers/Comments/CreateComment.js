import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { createCommentProvider } from "../../provider/Comments/CreateCommentProvider.js";

const validate = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25),
	comment:  yup.string().strict().required().min(5)
});

export const validateReqCreateComment = validateData("body", validate);

export const createComment = async (req, res) => {

	const {userId} = req.user;

	const comment = await validate.validate(req.body, {stripUnknown: true});
	comment.userId = userId;

	const result = await createCommentProvider(comment);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(201).json({error: false, result: result});
    
};
