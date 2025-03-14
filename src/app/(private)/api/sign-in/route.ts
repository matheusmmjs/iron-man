import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/services/authService";

export async function POST(request: NextRequest) {
  try {
    const { cpf, password } = await request.json();
    console.log(`Tentativa de login para CPF: ${cpf}`);

    const { auth_token, client } = await authenticateUser(cpf, password);

    const response = NextResponse.json({
      auth_token,
      user: { 
        cpf: client.cpf,
        name: client.name,
        email: client.email,
        phone: client.phone,
        birthDate: client.birthDate,
        jobTitle: client.jobTitle,
        companyId: client.companyId,
      },
    });
    response.cookies.set("auth_token", auth_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return response;
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Error during authentication" },
      { status: 500 }
    );
  }
}
