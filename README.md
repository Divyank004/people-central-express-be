# Project Description

People central is a HR management tool. Where HR can manage employees timesheets, vacations, payrolls. And employees can apply for vacation, see their team mates vacations, fill timesheets. Backend is deployed in AWS EC2 instance and 
API Documentation can be accessed at the URL: https://peoplecentralbe.com/api-docs

### Current Userflow:

Employee:

- Can login with credentials
- Look at the dashboard that shows number of vacation days left, list of
  documents, number of vacations taken in different categories, apply for
  vacation.
- Can go to Absence page to look vacation history and apply for vacation if
  needed.
- Can go to MyTeam page to look at the team members and their vacation
  calendar.
- Can go to timesheets page to update the working hours daily.

## Tech Stack:

Nodejs, Express, Typescript, Postgres, Knex.js, migrations, JWT, Docker, AWS EC2, Nginx, ESLint

## Setup

### Environment Variables

Define the following env variables in .env file

```
NODE_ENV
PORT
JWT_SECRET

DB_DEV_HOST
DB_DEV_PORT
DB_DEV_DBNAME
DB_DEV_USER
DB_DEV_PASS

DB_STAG_HOST
DB_STAG_PORT
DB_STAG_DBNAME
DB_STAG_USER
DB_STAG_PASS

DB_PROD_HOST
DB_PROD_PORT
DB_PROD_DBNAME
DB_PROD_USER
DB_PROD_PASS
```

### Install dependencies

```
yarn
```

### Run in Dev mode

```
npm run dev
```

### Run in Production mode

```
npm run build
npm run start
```

### Run in Docker (both backend server and postgres db will be setup with tables)

```
docker compose build

docker compose up -d

# check logs
docker compose logs backend
docker compose logs postgres

# restart only backend for backend code changes
docker-compose restart backend
```

Server should be up and running under http://localhost:PORT
