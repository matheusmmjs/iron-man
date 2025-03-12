const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  try {
    const company = await prisma.company.upsert({
      where: { slug: 'studio-pilates' },
      update: {},
      create: {
        name: 'Studio Pilates',
        slug: 'studio-pilates'
      }
    });

    const hashedPassword = await hashPassword('senha123');
    
    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {
        password: hashedPassword
      },
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN',
        companyId: company.id
      }
    });

    console.log('----------------------------------------');
    console.log('Usuário admin criado/atualizado:');
    console.log('Email: admin@example.com');
    console.log('Senha: senha123');
    console.log('----------------------------------------');
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 