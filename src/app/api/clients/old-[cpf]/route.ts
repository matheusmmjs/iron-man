import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { cpf: string } }) {
  try {
    const { cpf } = await params;
    
    const client = await prisma.client.findUnique({
      where: { cpf },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Error fetching client" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { cpf: string } }) {
  try {   
    const { cpf } = await params;

    const { name, email, phone, address, birthDate, isActive } = await request.json();
    
    const client = await prisma.client.update({
      where: { cpf },
      data: { name, email, phone, address, birthDate, isActive },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { cpf: string } }) {
  try {
    const { cpf } = await params;

    await prisma.client.delete({
      where: { cpf },
    });

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Error deleting client" },
      { status: 500 }
    );
  }
}