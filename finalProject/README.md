<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="./applaudo.png" alt="Logo" height= "100">
  </a>

<h1 align="center">Ticket Management System</h1>

  <p align="center">
    Final project for the Node.JS trainee program, it consists of an API that allows for creation of tickets to resolve issues for a project, it also supports Oauth 2.0 using google's servers and role based authorization.
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
</br>
<!-- ABOUT THE PROJECT -->

## About The Project

The project solves the business requirement of being able to create a ticket management system that allows for custom projects to be built where different types of users will be able to create, modify, solve and assign tickets on a per-project scope.

- 4 types of users will interact with the API
  - General user
  - Project Support Team
  - Project Administrator
  - Super Admin

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To start setting up the project first clone the repo into your desired folder:

```bash
git clone https://gitlab.com/final-project42/ticket-management-system.git <target folder>
```

### Prerequisites

This API requires the following services to be setup and configured in a .env file:

- A google oauth 2.0 service
  <a href= 'https://medium.com/@flavtech/google-oauth2-authentication-with-nestjs-explained-ab585c53edec'>Reference article to set it up</a>
- Docker and Docker Compose
  <a href='https://docs.docker.com/engine/install/'>Docker engine installation</a>
- Node.JS and NPM LTS
  <a href= 'https://github.com/nvm-sh/nvm'>nvm installation</a>

### Installation

1. Using the included docker-compose and Dockerfile configuration an example .env could be as follows:

```env
NODE_ENV = 'development'

HOST = 'localhost'
PORT = 3000

DB_NAME = 'tms'
DB_URI= 'mongodb://root:password@mongo:27017/tms?serverSelectionTimeoutMS=2000&authSource=admin'

JWT_SECRET = 'some very secure secret'

MAIL_HOST='mailhog'
MAIL_PORT='1025'
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM='admin@exmple.com'

GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
GOOGLE_CALLBACK_URL =
GOOGLE_AUTH_URL =
```

2. Using docker, start up the API
   ```sh
   docker compose up
   ```
3. Using the configured port in a browser, access the interactive Swagger documentation:
   ```url
   http://localhost:<yourport>/api
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
