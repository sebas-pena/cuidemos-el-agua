import brypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await brypt.genSalt(10);
  const hashedPassword = await brypt.hash(password, salt);
  return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
  return brypt.compare(password, hashedPassword);
}