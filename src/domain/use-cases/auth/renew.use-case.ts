import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors";

interface User {
  uid: string;
  username: string;
  is_online: boolean;
  picture?: string;
  profile?: any;
  profileId?: string;
  role: string;
}

interface UserAccessToken {
  status: boolean;
  accessToken: string;
  user: User;
}

type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

interface RenewUseCase {
  execute(user: User): Promise<UserAccessToken>;
}

export class Renew implements RenewUseCase {
  constructor(
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(user: User): Promise<UserAccessToken> {
    
    const accessToken = await this.signToken({ uid: user.uid });
    if (!accessToken) throw CustomError.internalServer('Error generating accessToken');

    return {
      status: true,
      accessToken,
      user: { 
        uid: user.uid,
        role: user.role,
        username: user.username,
        is_online: user.is_online,
        picture: user.picture,
      }
    };
  }
}
