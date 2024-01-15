import * as yup from "yup";
import { validateData } from "../../middleware/validateData.js";
import { authenticateUserProvider } from "../../provider/User/AuthenticateUserProvider.js";

const validate = yup.object().shape({
	userId: yup.string(),
});

const html = `<!DOCTYPE html>
<html>
<head>
 <title>Autenticação bem-sucedida</title>
 <style>
     body {
         font-family: Arial, sans-serif;
     }
     .container {
         width: 80%;
         margin: auto;
         background-color: #f8f9fa;
         padding: 20px;
         border-radius: 5px;
     }
     .header {
         text-align: center;
         color: #6c757d;
     }
     .button {
         display: inline-block;
         background-color: #007bff;
         color: white;
         padding: 10px 20px;
         text-decoration: none;
         border-radius: 5px;
         margin-top: 20px;
     }
 </style>
</head>
<body>
 <div class="container">
     <h1 class="header">Autenticação bem-sucedida!</h1>
     <p>Sua conta foi autenticada com sucesso. Agora você pode fazer login.</p>
 </div>
</body>
</html>`;

const userNotFoundHtml = `<!DOCTYPE html>
<html>
<head>
 <title>Erro</title>
 <style>
    body {
        font-family: Arial, sans-serif;
    }
    .container {
        width: 80%;
        margin: auto;
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 5px;
    }
    .header {
        text-align: center;
        color: #6c757d;
    }
 </style>
</head>
<body>
 <div class="container">
    <h1 class="header">Erro, autenticação não foi relizada!</h1>
    <p>Usuário não encontrado.</p>
 </div>
</body>
</html>`;

const authErrorHtml = `<!DOCTYPE html>
<html>
<head>
 <title>Erro</title>
 <style>
    body {
        font-family: Arial, sans-serif;
    }
    .container {
        width: 80%;
        margin: auto;
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 5px;
    }
    .header {
        text-align: center;
        color: #6c757d;
    }
 </style>
</head>
<body>
 <div class="container">
    <h1 class="header">Erro, autenticação não foi relizada!</h1>
    <p>Ocorreu um erro ao autenticar o usuário.</p>
 </div>
</body>
</html>`;

{/* <a href="${process.env.HOST}/login">Ir para o login</a> */}

export const validateReqAuthenticationUser = validateData("params", validate);

export const authenticateUser = async (req, res) => {

	const {userId} = await validate.validate(req.params, {stripUnknown: true});
	const result = await authenticateUserProvider(userId);

	if(result instanceof Error){
		if(result.message === "USER_NOT_EXISTS"){
			return res.status(409).send(userNotFoundHtml);
		}
		return res.status(500).send(authErrorHtml);
	}

	return res.status(200).send(html);
};