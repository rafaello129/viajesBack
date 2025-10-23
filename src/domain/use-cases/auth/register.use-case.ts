import { JwtAdapter } from "../../../config";
import { RegisterDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";

interface UserAccessToken {
  status: boolean;
  accessToken: string;
  user: {
    uid: string;
    username: string;
    is_online: boolean;
    picture?: string;
    role: string;
    profile?: any;
  };
}
type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterDto): Promise<UserAccessToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterDto): Promise<UserAccessToken> {
    const user = await this.authRepository.register(registerUserDto);
    const accessToken = await this.signToken({
      uid: user.uid,
    });

    if (!accessToken)
      throw CustomError.internalServer("Error generating accessToken");

    return {
      status: true,
      accessToken,
      user: {
        uid: user.uid,
        role: user.role,
        username: user.username,
        is_online: user.is_online,
        picture: user.picture,
      },
    };
  }
}
