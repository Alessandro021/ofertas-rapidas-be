import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { updateCommentByIdProvider } from "../../provider/Comments/UpdateCommentByIdProvider.js";

const validateParams = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25), //commentId: string
});

const validateBody = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25), //promotionId: string
	comment:  yup.string().strict().optional().min(5)
});

export const validateReqUpdateCommentParams = validateData("params", validateParams);

export const validateReqUpdateCommentBody = validateData("body", validateBody);

export const updateCommentById = async (req, res) => {
	const {userId } = req.user;

	const comment = {commentId: req.params?.id, promotionId: req.body?.promotionId};
	if(req.body?.comment){
		comment.comment = req.body?.comment;
	}
	comment.userId = userId;


	const result = await updateCommentByIdProvider(comment);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};