# ---------- Build frontend ----------
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Instalar dependencias
COPY frontend/package*.json ./
RUN npm install

# Copiar todo el frontend y generar build
COPY frontend/ .
RUN npm run build   # genera frontend/dist

# ---------- Build backend ----------
FROM node:18 AS backend-build
WORKDIR /app/backend

# Instalar dependencias backend
COPY backend/package*.json ./
RUN npm install

# Copiar código backend
COPY backend/ .

# Copiar build del frontend dentro del backend/public
RUN mkdir -p /app/backend/public
COPY --from=frontend-build /app/frontend/dist /app/backend/public

# Exponer puerto
EXPOSE 3000

# Iniciar servidor
CMD ["npm", "start"]