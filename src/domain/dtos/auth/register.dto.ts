export class RegisterDto {
    private constructor(
        public name: string,
        public username: string,
        public password: string,
        public role: string = 'user',
    ) {}

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {
        const { name, username, password, role } = object;

        if (!name) return [`Missing 'name'`];
        if (!username) return [`Missing 'username'`];
        if (!password) return [`Missing 'password'`];
        if (role !== 'user' && role !== 'admin') return [`Invalid 'role', must be 'user' or 'admin'`];
        if (password.length < 6) return [`'password' too short, min length 6`];

        return [undefined, new RegisterDto(name, username.toLowerCase(), password, role)];
    }
}
