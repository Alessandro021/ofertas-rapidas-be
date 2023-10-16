import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { createRatingProvider } from "../../provider/Ratings/CreateRatingProvider.js";

const validate = yup.object().shape({
	promotionId: yup.string().strict().required().min(25).max(25),
	comment:  yup.string().strict().optional().min(5),
	rating: yup.number().strict().required().positive().moreThan(0).lessThan(6),
});

export const validateReqCreateRating = validateData("body", validate);

export const createRating = async (req, res) => {

	const {userId } = req.user;
	const {userName, userSurname, photo } = req.user.profile;

	const comment = await validate.validate(req.body, {stripUnknown: true});
	comment.userId = userId;
	comment.userName = userName;
	comment.userSurname=  userSurname;
	comment.userPhoto = photo;

	const result = await createRatingProvider(comment);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(201).json({error: false, result: result});
    
};
