export class RegisterDto {
    private constructor(
        public name: string,
        public username: string,
        public password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {
        const { name, username, password, role } = object;

        if (!name) return [`Missing 'name'`];
        if (!username) return [`Missing 'username'`];
        if (!password) return [`Missing 'password'`];
        if (password.length < 6) return [`'password' too short, min length 6`];

        return [undefined, new RegisterDto(name, username.toLowerCase(), password)];
    }
}
