# Server

## Technologies

- Fastify
- Eslint + Prettier
- TapJS (for testing)
- Prisma ORM
- PostgresSQL
- Typescript

## Available Commands

#### Run Development Server

```
yarn dev
```

#### Linter

```
yarn lint
```

```
yarn lint:fix
```

#### Styles

```
yarn style
```

```
yarn style:fix
```

#### Tests

```
yarn test
```

#### Prisma Studio

```
yarn prisma studio
```

## Available Routes

- **GET /docs** - Swagger with OpenAPI Documentation
- **POST /api/users** - Register a new user
- **POST /api/users/login** - Login user

## Roadmap

1. [x] Setup Eslint + Prettier
2. [x] Setup Prisma ORM
3. [x] Create `users` and `posts` models
4. [x] Create and configure `server` with `Fastify`
5. [x] Setup Swagger with OpenApi config
6. [x] Create User Register
7. [x] Create User Login
8. [ ] CRUD Posts
9. [ ] Dockerize application
10. [ ] Deploy
