import bcrypt from "bcrypt";
import { SignJWT, JWTPayload } from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET) ?? "secret";
const JWT_EXPIRATION = "1h";

async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function generateToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

export async function authenticateUser(cpf: string, password: string) {
  const client = await prisma.user.findUnique({ where: { cpf } });
  
  if (!client) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await validatePassword(password, client.password);
  
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const auth_token = await generateToken({ cpf: client.cpf });
  console.log("auth_token", auth_token)

  return { auth_token, client };
}
