# Étape 1: Construire le frontend
FROM node:16 AS build

WORKDIR /app
COPY ./frontend /app
RUN npm install
RUN npm run build   # ou `vite build`

# Étape 2: Utiliser Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier le build du frontend depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
