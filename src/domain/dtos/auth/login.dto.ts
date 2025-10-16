export class LoginDto {
    private constructor(
        public username: string,
        public password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, LoginDto?] {
        const { username, password } = object;

        if (!username) return [`Missing 'username'`];
        if (!password) return [`Missing 'password'`];
        if (password.length < 6) return [`'password' too short, min length 6`];

        return [undefined, new LoginDto(username.toLowerCase(), password)];
    }
}
