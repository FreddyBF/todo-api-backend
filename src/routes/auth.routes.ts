import { Router } from "express";

import { AuthController } from "@controllers/auth.controller";
import { AuthService } from "@services/auth.service";
import { prisma } from "@config/prisma";
import { UserRepository } from "@repositories/user.repository";

import { validate } from "@middlewares/validate.middleware";
import { CreateUserSchema } from "@dtos/auth/register.dto";
import { LoginUserSchema} from "@dtos/auth/login.dto";

const userRepository = new UserRepository(prisma);
const authController = new AuthController(new AuthService(userRepository));
const route = Router();

route.post(
    "/register", 
    validate(CreateUserSchema), 
    authController.register
);

route.post(
    "/login", 
    validate(LoginUserSchema), 
    authController.login
);

export default route;