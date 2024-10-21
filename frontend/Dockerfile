# Étape 1: Construire le frontend avec Node.js
FROM node:18 as build

WORKDIR /app
COPY . /app   
RUN npm install
RUN npm run build 
COPY . .
# Exposer le port 8000
EXPOSE 8000
# Commande par défaut pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]

# Étape 2: Utiliser Nginx pour servir le contenu statique
FROM nginx:alpine

# Copier les fichiers build du frontend vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
