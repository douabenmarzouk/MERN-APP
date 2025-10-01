# Étape 1 : builder
FROM node:20-alpine AS build
WORKDIR /frontend-app

# Installer outils pour compilation (rollup et deps natives)
RUN apk add --no-cache python3 g++ make

# Copier package.json et installer
COPY package*.json ./
RUN npm install

# Copier le code
COPY . .

# Builder l'application
RUN npm run build

# Étape 2 : servir avec Nginx
FROM nginx:alpine
COPY --from=build /frontend-app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

