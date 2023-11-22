import jsonwebtoken from "jsonwebtoken";
import { User } from "../interfaces/user.interface.js";

const JWT_SECRET = process.env.JWT_SECRET || "token. 0101";
const { sign, verify } = jsonwebtoken;

const generateToken = ({ _id, email }: User) => {
  const jwt = sign({ _id, email }, JWT_SECRET, {
    expiresIn: "24h",
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };
