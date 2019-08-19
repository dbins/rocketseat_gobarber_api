import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

class ConfirmationMail {
  get key(){
    return 'ConfirmationMail'; // nome da chave unica
  }

  async handle({ data }){

    const { appointment_mail } = data;


    await Mail.sendMail({
      to: `${appointment_mail.provider.name} <${appointment_mail.provider.email}>`,
      subject: 'GoBarber - Agendamento marcado',
      template : 'confirmation',
      context: {
        provider: appointment_mail.provider.name,
        user: appointment_mail.user.name,
		email: appointment_mail.user.email,
        date: format(
          parseISO(appointment_mail.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'", { locale: pt}
        ),
      },
    });
  }
}

export default new ConfirmationMail();