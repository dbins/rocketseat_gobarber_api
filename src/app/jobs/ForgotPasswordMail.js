import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

class ForgotPasswordMail {
  get key(){
    return 'ForgotPasswordMail'; // nome da chave unica
  }

  async handle({ data }){

    const { user, token } = data;

    //console.log('a fila andou');

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'GoBarber - Esqueceu sua senha?',
      template : 'password',
      context: {
        name: user.name,
        token: token
      },
    });
  }
}

export default new ForgotPasswordMail();