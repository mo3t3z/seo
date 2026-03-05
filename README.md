# SEO-IA Dashboard

Dashboard d'analyse SEO avec intelligence artificielle, développé en Angular 17+.

## Prérequis

Avant d'installer l'application, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** : version 18.x ou supérieure
  - Téléchargement : https://nodejs.org/
  - Vérifier : `node --version`

- **npm** : version 9.x ou supérieure (inclus avec Node.js)
  - Vérifier : `npm --version`

- **Angular CLI** : version 17.x ou supérieure
  - Installation : `npm install -g @angular/cli`
  - Vérifier : `ng version`

## Installation

### 1. Accéder au dossier du projet

```bash
cd seo-ia-dashboard
```

### 2. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

> **Note** : L'option `--legacy-peer-deps` est nécessaire pour résoudre les conflits de dépendances avec ng2-charts.

### 3. Lancer le serveur de développement

```bash
ng serve
```

L'application sera accessible à l'adresse : **http://localhost:4200**

### Alternative : Lancer avec ouverture automatique du navigateur

```bash
ng serve --open
```

## Connexion

L'application utilise une **authentification simulée (mock)**. Vous pouvez vous connecter avec n'importe quelles informations :

| Champ | Exemple |
|-------|---------|
| Email | `test@example.com` |
| Mot de passe | `password123` |

> Toute combinaison email/mot de passe valide fonctionnera.

## Structure du projet

```
seo-ia-dashboard/
├── src/
│   ├── app/
│   │   ├── core/                    # Services, guards, layout
│   │   │   ├── guards/              # AuthGuard
│   │   │   ├── layout/              # Layout shell, topbar, sidebar
│   │   │   ├── models/              # Interfaces TypeScript
│   │   │   └── services/            # Services (auth, analytics, seo, ai)
│   │   ├── features/                # Modules fonctionnels
│   │   │   ├── auth/                # Page de connexion
│   │   │   ├── dashboard/           # Tableau de bord principal
│   │   │   ├── keywords/            # Analyse des mots-clés
│   │   │   ├── pages/               # Performance des pages
│   │   │   ├── reports/             # Rapports hebdo/mensuels
│   │   │   └── settings/            # Paramètres du site
│   │   ├── shared/                  # Composants réutilisables
│   │   │   └── components/          # metric-card, page-header, etc.
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.scss                  # Styles globaux
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
```

## Fonctionnalités

### Pages disponibles

| Route | Description |
|-------|-------------|
| `/login` | Page de connexion |
| `/dashboard` | Tableau de bord avec KPIs, graphiques et recommandations IA |
| `/keywords` | Liste des mots-clés avec filtres et tendances |
| `/pages` | Performance SEO des pages du site |
| `/reports` | Rapports hebdomadaires et mensuels |
| `/settings` | Configuration du site |

### Composants

- **Metric Cards** : Affichage des KPIs avec variation en pourcentage
- **Graphiques** : Courbes de trafic (ng2-charts + Chart.js)
- **Tableaux** : Données paginées avec tri et filtres
- **États** : Loading, Empty, Error pour une meilleure UX

## Scripts disponibles

```bash
# Serveur de développement
ng serve

# Build de production
ng build

# Linter
ng lint

# Tests unitaires
ng test
```

## Technologies utilisées

- **Angular 17+** avec composants standalone
- **Angular Material** (thème Azure Blue)
- **ng2-charts** + **Chart.js** pour les graphiques
- **RxJS** pour la gestion réactive des données
- **TypeScript** en mode strict

## Résolution des problèmes

### Erreur de dépendances npm

```bash
npm install --legacy-peer-deps
```

### Port 4200 déjà utilisé

```bash
ng serve --port 4300
```

### Effacer le cache npm

```bash
npm cache clean --force
rm -rf node_modules
npm install --legacy-peer-deps
```

## Support

Pour toute question ou problème, vérifiez que :
1. Node.js et npm sont correctement installés
2. Angular CLI est installé globalement
3. Toutes les dépendances sont installées avec `--legacy-peer-deps`

---

Développé avec Angular 17+ | Angular Material | Chart.js
