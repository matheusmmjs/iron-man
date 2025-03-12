#!/bin/sh

set -e  # Parar execução em caso de erro

echo "=== Iniciando setup da aplicação ==="

# Regenerar o cliente Prisma
echo "1. Regenerando cliente Prisma..."
npx prisma generate
echo "✓ Cliente Prisma regenerado"

# Executar migrações
echo "2. Executando migrações do Prisma..."
npx prisma migrate deploy
echo "✓ Migrações executadas"

# Criar usuário admin se não existir
echo "3. Verificando/criando usuário admin..."
NODE_ENV=development ts-node scripts/create-admin.ts
echo "✓ Verificação de usuário admin concluída"

# Iniciar a aplicação
echo "4. Iniciando a aplicação..."
npm run dev 