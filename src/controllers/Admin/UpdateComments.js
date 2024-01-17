import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { updateCommentByIdProvider } from "../../provider/Comments/UpdateCommentByIdProvider.js";

const validateParams = yup.object().shape({
	userId: yup.string().strict().required().min(36).max(36), //userId: string
});

const validateBody = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25), //promotionId: string
	comment:  yup.string().strict().optional().min(5),
	commentId: yup.string().strict().required().min(25).max(25), //commentId: string
});

export const validateReqUpdateCommentsParams = validateData("params", validateParams);

export const validateReqUpdateCommentsBody = validateData("body", validateBody);

export const updateComments = async (req, res) => {

	const { userId} = await validateParams.validate(req.params, {stripUnknown: true});

	const comment = await validateBody.validate(req.body, {stripUnknown: true});
	comment.userId = userId;

	const result = await updateCommentByIdProvider(comment);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};