/*
  Warnings:

  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContact` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `healthNotes` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `objectives` on the `Client` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "companyId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Inserir uma empresa padrão
INSERT INTO "Company" ("id", "name", "slug", "createdAt", "updatedAt")
VALUES ('00000000-0000-0000-0000-000000000000', 'Empresa Padrão', 'empresa-padrao', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "dateOfBirth" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    CONSTRAINT "Client_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("active", "createdAt", "dateOfBirth", "email", "id", "name", "phone", "updatedAt") 
SELECT "active", "createdAt", "dateOfBirth", "email", "id", "name", "phone", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE INDEX "Client_companyId_idx" ON "Client"("companyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Criar um usuário admin padrão
INSERT INTO "User" ("id", "email", "password", "name", "role", "companyId", "active", "createdAt", "updatedAt")
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    'admin@example.com', 
    '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', -- senha: 'senha123'
    'Administrador', 
    'ADMIN', 
    '00000000-0000-0000-0000-000000000000', 
    true, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");
