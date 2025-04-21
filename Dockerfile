# Usa una imagen liviana de Node.js
FROM node:18-alpine

# Instala dependencias necesarias para Prisma
RUN apk add --no-cache openssl

# Define el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Construye la app de Next.js
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
