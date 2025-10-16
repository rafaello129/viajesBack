
export class UserEntity {

    constructor(
        public uid: string,
        public name: string,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public picture: string,
        public is_active: boolean,
        public is_online: boolean,
        public is_disabled: boolean,
        public is_google: boolean,
        public created_at: Date,
        public updated_at: Date,
    ) {}

}