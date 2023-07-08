import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  return token;
};

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(12);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const unHashPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};
