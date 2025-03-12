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
      data: { name, email },
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
    const { id, name, email } = await request.json();
    const client = await prisma.client.update({
      where: { id },
      data: { name, email },
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
    const { id } = await request.json();
    await prisma.client.delete({
      where: { id },
    });
    console.log("Client deleted successfully, ID:", id);
    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Error deleting client" },
      { status: 500 }
    );
  }
}