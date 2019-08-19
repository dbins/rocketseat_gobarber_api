import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import Queue from '../../lib/Queue';

class SessionController{
  async store(req, res){
    // validando os dados de sessão
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Erro de validação na sessão " })
    }


    const { email, password } = req.body;

    const user = await User.findOne({ 
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }
      ]
    });
    if(!user){
      return res.status(401).json({ error: 'Usuário inexistente'});
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Senha incorreta'});
    }

    const {id, name, avatar, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn : authConfig.expiresIn,
      } ),
    })
  }
  
    async forgotPassword(req, res){
		const user_email = req.body.email;
		//Enviar o token 
		const schema = Yup.object().shape({
		  email: Yup.string().required()
		});
		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: "Erro de validação na sessão " })
		}
		const user = await User.findOne({ 
		  where: { email: user_email }
		});
		if(!user){
		  return res.status(401).json({ error: 'Usuário inexistente'});
		}
		const {id, email} = user;
		const token = jwt.sign({ id, email }, authConfig.secret, {expiresIn : authConfig.expiresIn});
		// envia email de aviso de esqueci minha senha
		await Queue.add(ForgotPasswordMail.key, {
			user, token
		});
		return res.status(200).json({message: 'E-mail de alterar senha enviado com suceso'});

    }
   
    async validateTokenForgotPassword (req, res){
		const { token } = req.body;
		//Recebe o token do e-mail de confirmacao de senha. 
		//Retorna o usuário para poder trocar a senha.
		const schema = Yup.object().shape({
		  token: Yup.string().required()
		});
		if(!(await schema.isValid(req.body))){
		  return res.status(400).json({ error: "Erro de validação na sessão " })
		}
		
		const decoded = await promisify(jwt.verify)(token, authConfig.secret);
		const user = await User.findOne({ 
		  where: { id: decoded.id },
		  include: [
			{
			  model: File,
			  as: 'avatar',
			  attributes: ['id', 'path', 'url'],
			}
		  ]
		});
	    if(!user){
		  return res.status(401).json({ error: 'Usuário inexistente'});
		}
		const {id, name, avatar, provider } = user;
		return res.status(200).json({
		  user: {
			id,
			name,
			email,
			provider,
			avatar,
		  },
		  token: jwt.sign({ id }, authConfig.secret, {
			expiresIn : authConfig.expiresIn,
		  } ),
		});
		
    }
  
  
}
export default new SessionController();