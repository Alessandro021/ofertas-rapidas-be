import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { deleteRatingByIdProvider } from "../../provider/Ratings/DeleteRatingByIdProvider.js";

const validate = yup.object().shape({
	id: yup.string().strict().required().min(25).max(25), //ratingId: string
});

export const validateReqDeleteRatingById = validateData("params", validate);

export const deleteRatingById = async (req, res) => {
	const {userId} = req.user;

	
	const rating = {ratingId: req.params?.id};
	rating.userId = userId;

	const result = await deleteRatingByIdProvider(rating);

	if(result instanceof Error){
		return res.status(500).json({error: true, errors: [{error: result.message}]});
	}

	return res.status(200).json({error: false, result: result});
};