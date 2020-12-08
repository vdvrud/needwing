import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (password: string, userPassword: string) => {
    const result = await bcrypt.compare(password, userPassword);
    return result;
}

export { comparePassword, hashPassword }