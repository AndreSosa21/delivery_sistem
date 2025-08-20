# Etapa 1: construir la app con Node
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias primero (mejor cacheo)
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Etapa 2: usar Nginx para servir los archivos estáticos
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Eliminar archivos default de Nginx
RUN rm -rf ./*

# Copiar el build desde la etapa anterior
COPY --from=build /app/dist .



EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
