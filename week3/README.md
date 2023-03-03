<a name="readme-top"></a>

<div align="center">

  <h3 align="center">Blog posts API with comments</h3>

  <p align="center">
    Implementation of a simple API for blog Posts with comments attached to a post id
  </p>
</div>

## Getting Started

### Prerequisites

You'll need Node.JS and npm installed to their latest version, also postman is supported and environment and collection files are included for testing the endpoints

### Installation

1. Clone the repo

```
git clone https://gitlab.com/trainee-nodejs/week3_blogAPI.git
```

2. Install NPM packages and CLI tool on your Node environment

```
npm install
```

3. Import environment and collection to postman

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

there are two endpoints:

```
/api/v1/blog/{{id}}
```

```
/api/v1/comment/{{id}}
```

which can be interacted with using GET, POST, DELETE methods through postman.

A user and a password has to be provided for usage within MongoDB through mongoose connect method, a temporary user has been created for testing purposes which will expire on 02/12/2022

```
mongodb+srv://<username>:<password>@nodeexpressprojects.m7zg22h.mongodb.net/<database>?retryWrites=true&w=majority
```

the database to be used is called

```
Blog
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
