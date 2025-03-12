FROM node:18-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache openssl libc6-compat

# Instalar ts-node globalmente
RUN npm install -g ts-node typescript

# Copiar arquivos de configuração
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Dar permissão aos scripts
RUN chmod +x /app/scripts/*

EXPOSE 3000 