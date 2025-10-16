import { LoginDto, RegisterDto } from "../dtos/auth";
import { UserEntity } from "../entities";

export abstract class AuthRepository {

    abstract login( loginDto: LoginDto ): Promise<UserEntity>

    abstract renew?(): Promise<UserEntity>

    abstract register( registerDto: RegisterDto ): Promise<UserEntity>
    
}