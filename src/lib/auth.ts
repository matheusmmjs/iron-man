import { jwtVerify, SignJWT } from "jose"

interface UserJwtPayload {
  jti: string
  iat: number
  userId: string
  email: string
  name: string
  role: string
}

export async function signAuth(payload: { userId: string; email: string; name: string; role: string }) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_change_this")
    const alg = "HS256"

    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1d")
      .setJti(crypto.randomUUID())
      .sign(secret)

    return token
  } catch (error) {
    console.error("Error signing token:", error)
    throw error
  }
}

export async function verifyAuth(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_change_this")
    const { payload } = await jwtVerify<UserJwtPayload>(token, secret)

    return payload
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

