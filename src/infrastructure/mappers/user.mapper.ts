import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class UserMapper {

    static userEntityFromObject(obj: { [key: string]: any }) {

        const { 
            uid,
            name,
            username,
            email,
            phone,
            password,
            picture,
            is_active,
            is_online,
            is_disabled,
            is_google,
            created_at,
            updated_at,
        } = obj;

        if (!uid) throw CustomError.badRequest(`'uid' is missing`);
        if (!username) throw CustomError.badRequest(`'username' is missing`);
        if (!password) throw CustomError.badRequest(`'password' is missing`);

        return new UserEntity(
            uid,
            name,
            username,
            email,
            phone,
            password,
            picture,
            is_active,
            is_online,
            is_disabled,
            is_google,
            created_at,
            updated_at,
        );
    }
}
