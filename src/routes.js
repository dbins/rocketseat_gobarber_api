import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";
import AvailableController from "./app/controllers/AvailableController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);
// cadastro de usuario
routes.post("/users", UserController.store);

// login
routes.post("/sessions", SessionController.store);
routes.post("/forgot_password", SessionController.forgotPassword);
routes.post("/validate_token", SessionController.validateTokenForgotPassword);

// autenticação do token através do middleware de autenticação
routes.use(authMiddleware); // rotas abaixo todas tem que passar pela autenticação

// atualização de usuario
routes.put("/users", UserController.update);

// listagem de prestadores de serviço
routes.get("/providers", ProviderController.index);
routes.get("/providers/:providerId/available", AvailableController.index);
routes.get("/providers/:providerId/days", AvailableController.days);

// listagen e agendamento de serviço usuario normal
routes.get("/appointments", AppointmentController.index);
routes.post("/appointments", AppointmentController.store);
routes.delete("/appointments/:id", AppointmentController.delete);

// listagem de servicos para os providers
routes.get("/schedule", ScheduleController.index);

// lista de notificações de agendamento
routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update); // marca como lida ou visto

// Imagens
routes.post("/files", upload.single("file"), FileController.store);
routes.get("/files/:id", FileController.index);
routes.put("/files/:id", upload.single("file"), FileController.update);
routes.delete("/files/:id", upload.single("file"), FileController.delete);

export default routes;
