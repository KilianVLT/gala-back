# Utilisation de l'image Node.js comme base
FROM node:20-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port sur lequel le backend écoute
EXPOSE 3001

# Command to run the Next.js app
CMD ["npm", "run", "start"]