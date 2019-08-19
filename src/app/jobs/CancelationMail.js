import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

class CancelationMail {
  get key(){
    return 'CancelationMail'; // nome da chave unica
  }

  async handle({ data }){

    const { appointment } = data;

    //console.log('a fila andou');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'GoBarber - Agendamento cancelado',
      template : 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'", { locale: pt}
        ),
      },
    });
  }
}

export default new CancelationMail();