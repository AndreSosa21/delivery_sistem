# Imagen base de Node.js
FROM node:20

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto donde corre Express
EXPOSE 3000

# Comando para arrancar el backend
CMD ["npm", "start"]
