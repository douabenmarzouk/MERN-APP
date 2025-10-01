
FROM node:18-alpine
# 2. Dossier de travail dans le container
WORKDIR /app
# 3. Copier package.json et installer
COPY package*.json ./
RUN npm install
# 4. Copier tout le code
COPY . .
# 5. Exposer le port backend
EXPOSE 5000
# 6. Lancer le serveur
CMD ["node", "src/server.js"]
