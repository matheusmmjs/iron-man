import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const client = await prisma.client.findUnique({
        where: { id },
      });
      return client 
        ? NextResponse.json(client)
        : NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const clients = await prisma.client.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await prisma.client.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating client' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
    return NextResponse.json(updatedClient);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating client' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  try {
    await prisma.client.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting client' }, { status: 500 });
  }
} 