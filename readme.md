# Cours API

API REST pour la gestion des utilisateurs, des films/séries et des évaluations. Ce projet utilise Express.js, Prisma ORM, PostgreSQL et l'API OMDB pour récupérer les informations sur les films et séries.

## 📋 Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)
- Une clé API OMDB (gratuite sur [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/rayan-ahamadi/cours-api.git
cd cours-api
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos propres valeurs :

```env
PORT=3000
DATABASE_URL=postgresql://postgres:your_password@db:5432/cours-api
JWT_SECRET=your_jwt_secret_key
OMDB_API_KEY=your_omdb_api_key

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=cours-api
```

**⚠️ Important :**

- Remplacez `your_password` par un mot de passe sécurisé
- Remplacez `your_jwt_secret_key` par une clé secrète aléatoire
- Remplacez `your_omdb_api_key` par votre clé API OMDB

### 3. Lancer l'application avec Docker

```bash
docker compose up --build
```

L'API sera accessible sur `http://localhost:3000`

### 4. Arrêter l'application

```bash
# Arrêt simple
docker compose down

# Arrêt + suppression des volumes (réinitialise la base de données)
docker compose down -v
```

## 📦 Installation sans Docker (développement local)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer PostgreSQL localement

Assurez-vous d'avoir PostgreSQL installé et lancé, puis créez une base de données :

```sql
CREATE DATABASE "cours-api";
```

Modifiez le `DATABASE_URL` dans `.env` :

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/cours-api
```

### 3. Appliquer les migrations Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

## 📚 Documentation API

La documentation interactive Swagger est disponible à l'adresse suivante une fois l'application lancée :

```
http://localhost:3000/api/v1/docs
```

### Endpoints principaux

#### Utilisateurs

- `POST /api/v1/user/register` - Inscription d'un nouvel utilisateur
- `POST /api/v1/user/login` - Connexion d'un utilisateur
- `GET /api/v1/user/users` - Liste des utilisateurs (paginée)
- `PUT /api/v1/user/protected/{userId}` - Mise à jour d'un utilisateur (authentifié)
- `DELETE /api/v1/user/protected/{userId}` - Suppression d'un utilisateur (authentifié)

#### Titres (Films/Séries)

- `GET /api/v1/title/name/{name}` - Rechercher des titres par nom
- `GET /api/v1/title/imdb/{imdbID}` - Récupérer un titre par son ID IMDB

#### Évaluations

- `GET /api/v1/rating` - Liste des derniers avis (paginée)
- `GET /api/v1/rating/user/{userId}` - Avis d'un utilisateur spécifique
- `POST /api/v1/rating/protected/rate` - Créer un avis (authentifié)
- `PUT /api/v1/rating/protected/update/{ratingId}` - Modifier un avis (authentifié)
- `DELETE /api/v1/rating/protected/delete/{ratingId}` - Supprimer un avis (authentifié)

## 🔐 Authentification

L'API utilise des tokens JWT pour l'authentification. Les tokens sont stockés dans les cookies `accessToken` et `refreshToken`.

**Exemple d'inscription :**

```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "password123"
  }'
```

**Utiliser le token pour les routes protégées :**

Le token est automatiquement envoyé via les cookies. Pour les requêtes avec curl, utilisez l'option `-b` pour envoyer les cookies.

## 🗄️ Base de données

### Schéma Prisma

Le schéma de la base de données est défini dans `prisma/schema.prisma` et comprend :

- **User** : Utilisateurs de l'application
- **Title** : Films et séries (données OMDB)
- **Rating** : Évaluations des utilisateurs sur les titres

### Gestion des migrations

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name description_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
```

## 🛠️ Scripts disponibles

```bash
npm run dev       # Lancer en mode développement avec nodemon
npm start         # Lancer en mode production
npm run test      # Lancer les tests (à configurer)
```

## 📁 Structure du projet

```
cours-api/
├── controller/          # Logique métier des contrôleurs
├── db/                  # Configuration Prisma
├── helpers/             # Fonctions utilitaires (JWT, OMDB)
├── middlewares/         # Middlewares Express (auth)
├── prisma/              # Schéma et migrations Prisma
├── routes/              # Définition des routes API
│   └── v1/              # Routes version 1
├── service/             # Services externes (OMDB)
├── swagger/             # Documentation OpenAPI
├── app.js               # Point d'entrée de l'application
├── docker-compose.yaml  # Configuration Docker
├── Dockerfile           # Image Docker de l'application
└── package.json         # Dépendances et scripts
```

## 🔧 Technologies utilisées

- **Runtime** : Node.js v18
- **Framework** : Express.js
- **Base de données** : PostgreSQL 15
- **ORM** : Prisma
- **Authentification** : JWT (jsonwebtoken)
- **Validation** : express-validator
- **Documentation** : Swagger/OpenAPI
- **Containerisation** : Docker & Docker Compose
- **API externe** : OMDB API

## 📝 Notes

- Les données des films/séries sont récupérées depuis l'API OMDB et mises en cache dans la base de données
- L'authentification utilise des access tokens (courte durée) et refresh tokens (longue durée)
- Les routes protégées nécessitent un token JWT valide
- La pagination est disponible sur les endpoints de liste (`limit` et `page`)

## 👤 Auteur

Rayan Ahamadi
