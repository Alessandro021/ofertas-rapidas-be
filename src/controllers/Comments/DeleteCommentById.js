import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deleteCommentByIdProvider } from "../../provider/Comments/DeleteCommentByIdProvider.js";

const validateParams = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25), //commentId: string
});

const validateBody = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25), //promotionId: string
});

export const validateReqDeleteCommentParams = validateData("params", validateParams);

export const validateReqDeleteCommentBody = validateData("body", validateBody);

export const deleteCommentById = async (req, res) => {
	const {userId} = req.user;

	
	const comment = {commentId: req.params?.id, promotionId: req.body?.promotionId};
	comment.userId = userId;

	const result = await deleteCommentByIdProvider(comment);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};