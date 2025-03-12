import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    console.log("Clients retrieved successfully");
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return NextResponse.json(
      { error: "Error retrieving clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const client = await prisma.client.create({
      data: { name, email, cpf, phone, address, birthDate },
    });
    console.log("Client created successfully:", client);
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Error creating client" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { name, email, cpf, phone, address, birthDate } = await request.json();
    const client = await prisma.client.update({
      where: { cpf },
      data: { name, email, phone, address, birthDate },
    });
    console.log("Client updated successfully:", client);
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Error updating client" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { cpf } = await request.json();
    await prisma.client.delete({
      where: { cpf },
    });
    console.log("Client deleted successfully, CPF:", cpf);
    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Error deleting client" },
      { status: 500 }
    );
  }
}