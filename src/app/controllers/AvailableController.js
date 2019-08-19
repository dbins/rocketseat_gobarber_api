import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
  getDay,
  addDays,
  isSaturday,
  isSunday
} from "date-fns";
import User from "../models/User";
import Appointment from "../models/Appointment";
import { Op } from "sequelize";

class AvailableController {
  async index(req, res) {
    //pegando a data da url ?date=1562764974894
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "data inválida" });
    }

    // assegurando que o valor seja numérico
    const searchDate = Number(date);

    // buscando agendamentos para a data informada
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    // setando os horários de atendimentos
    var schedule = [];
    if (isSaturday(searchDate) || isSunday(searchDate)) {
      schedule = [];
    } else {
      schedule = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00"
      ];
    }

    // objeto com os horarios disponiveis
    const avaiable = schedule.map(time => {
      /*formata cada horario para YYYY-MM-DD HH:MM:SS a partir da data informada 
      pelo usuario + os horarios de atendimento do schedule*/

      const [hour, minute] = time.split(":"); // explode de cada horario de atendimento
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) && // verifica se o horario já passou
          !appointments.find(a => format(a.date, "HH:mm") == time) // e se o horário ja esta marcado
      };
    });

    return res.json(avaiable);
  }

  async days(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.params.providerId, provider: true }
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: "Usuário não é provider " });
    }
    var results = [];
    for (var x = 0; x <= 9; x++) {
      var tmp = {};
      if (x === 0) {
        tmp.day = new Date();
        tmp.day_week = getDay(new Date());
      } else {
        tmp.day = addDays(new Date(), x);
        tmp.day_week = getDay(addDays(new Date(), x));
      }
      tmp.enabled = true;
      if (isSaturday(tmp.day) || isSunday(tmp.day)) {
        tmp.enabled = false;
      }
      results.push(tmp);
    }
    return res.status(200).json(results);
  }
}

export default new AvailableController();
