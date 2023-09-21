
// /** @type {(parameter: "body" | "headers" | "params" |  "query", schema: import("yup").ObjectSchema ;)} */

/**
 * @argument schema {import("yup").ObjectSchema} 
 * @argument parameter {"body" | "headers" | "params" |  "query"}
 */

export const validateData = (parameter , schema) => async (req, res, next) => {
	switch (parameter) {
	case  "body":
		await schema.validate(req.body, {abortEarly: false})
			.then(() => next())
			.catch(err => res.status(422).json({errors: err.inner.map(err => ({[err.path]: err.message}))}));
		break;
	case  "headers":
		await schema.validate(req.headers, {abortEarly: false})
			.then(() => next())
			.catch(err => res.status(422).json({errors: err.inner.map(err => ({[err.path]: err.message}))})); 
		break;
	case  "params":
		await schema.validate(req.params, {abortEarly: false})
			.then(() => next())
			.catch(err => res.status(422).json({errors: err.inner.map(err => ({[err.path]: err.message}))})); 
		break;
	case  "query":
		await schema.validate(req.query, {abortEarly: false})
			.then(() => next())
			.catch(err => res.status(422).json({errors: err.inner.map(err => ({[err.path]: err.message}))})); 
		break;
	default:
		res.status(422).json({errors: "Erro ao validar dados enviados"});
	}
};