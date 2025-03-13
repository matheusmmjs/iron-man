import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      where: { isActive: true },
    });
    
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return NextResponse.json(
      { error: "Error retrieving clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { cpf, name, email, phone, address, birthDate } = await request.json();
    const client = await prisma.client.create({
      data: { cpf, name, email, phone, address, birthDate },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Error creating client" },
      { status: 500 }
    );
  }
}
