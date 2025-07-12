import { IUserRepository } from '@interfaces/IUserRepository';
import { CreateUserDTO } from '@dtos/auth/register.dto';
import { LoginUserDto } from '@dtos/auth/login.dto';
import { UserResponseDto } from '@dtos/auth/user-response.dto';
import { AuthResponseDto } from '@dtos/auth/auth-response.dto';
import { hashPassword, comparePassword } from '@utils/hash.utils';
import { generateToken } from '@utils/jwt.utils';
import { InvalidCredentialsError } from '@errors/InvalidCredentialsError';
import { UserAlreadyExistsError } from '@errors/userAlyreadExist.error';

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(data: CreateUserDTO): Promise<UserResponseDto> {
    const exists = await this.userRepository.findByEmail(data.email);

    if (exists) throw new UserAlreadyExistsError();

    const hashed = await hashPassword(data.password);
    const user = await this.userRepository.create({ 
      ...data, password: hashed 
    });
    const userdto: UserResponseDto = {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
    return userdto;
  }

  async login(data: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError('Usuário não encontrado');
    }

    const passwordIsValid = await comparePassword(data.password, user.password);
      if (!passwordIsValid) {
        throw new InvalidCredentialsError('Senha inválida');
      }
      // Usamos o campo `sub` como identificador principal no JWT
      const token = generateToken({ sub: user.id.toString() });
      return { token };
  }

}
