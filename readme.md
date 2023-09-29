![SoftMakers](https://vagas.softmakers.com.br/assets/img/logotipo14xxhdpi.png)

## Get Started

#### Setup a database with Docker

1. Initialize the Docker container with a Postgres database

```
yarn database:start
```

2. Execute the Prisma Migration:

```
yarn prisma migrate dev --name init
```

#### Install the dependencies

#### Start the Developement servers (front-end and back-end)

```
yarn dev
```

- **http://localhost:3000** - front-end server
- **http://localhost:3333** - back-end server
