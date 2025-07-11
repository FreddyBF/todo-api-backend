import { CreateUserDTO } from "@dtos/auth/register.dto";
import { LoginUserDto } from "@dtos/auth/login.dto";
import { AuthService } from "@services/auth.service";
import { sendResponse } from "@utils/sendResponse";
import { Request, Response, NextFunction } from "express";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateUserDTO = req.body;
      const user = await this.authService.register(dto);
      sendResponse(res, 201, 'Usuário criado com sucesso.', user);
    } catch (error) {
      next(error);
    }
  }

  
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: LoginUserDto = req.body;
      const authResponse = await this.authService.login(dto);
      sendResponse(res, 200, 'Login realizado com sucesso.', authResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
