# # Utiliser une image Node.js officielle comme image de base
 FROM node:18
 # Définir le répertoire de travail dans le conteneur
 WORKDIR /app
 # Copier le fichier package.json et package-lock.json (ou yarn.lock) au répertoire de travail
 COPY package*.json ./
 # Installer les dépendances
 RUN npm install
 # Copier le reste des fichiers du projet au répertoire de travail
 COPY . .
 # Exposer le port 8000
 EXPOSE 8000
 # Commande par défaut pour démarrer l'application en mode développement
 CMD ["npm", "run", "dev"]


# Utilise l'image officielle Nginx
FROM nginx:alpine

# Copie le contenu du dossier dist dans le répertoire par défaut de Nginx
COPY ./dist /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
