## Description

API to aggregate the news result from searching articles in The Guardian's API and The New York Time's API using a unified interface.

## Installation

```bash
$ npm install
```

## Running the app

### Environments

This API supports multiple environments by providing the appropriate .env file, it's recommended to use the dev environment

```bash
$ npm run start:dev
```

An API key must be provided for all the news API's

## Endpoints

### Authentication

User authentication endpoints work as follows:

### Sign Up

```
POST /api/v1/auth/signup
```

a body containing all the signup information has to be provided:

```typescript
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "username": string,
    "password": string
}
```

### Sign In

After creating a user, to be able to access the rest of the endpoint you must sign in through the endpoint:

```
POST /api/v1/auth/signin
```

the credentials for log in must be passed through the request body:

```typescript
{
    "username": string,
    "password": string
}
```

which will generate a response containing the jwt token needed to access everything else (expires in 1 day),
this token must be provided through a header

```
Authorization: Bearer <jwt provided after signin>
```

#### Sign Out

When the user wants to signout they must hit the following endpoint:

```
POST /api/v1/auth/signout
```

and by means of detecting the jwt in the header the database will be updated to change the state of the user to logged out

### News Query

it requires two query parameters to be provided (validated on start)

```

GET /api/v1/news?q=<query string>&source=<nyt|guardian|newsapi|many>

```

#### Response

If able to connect to the APIs and also authenticated the response will have the following interface:

```typescript
{ data:
  [
    {<response from The New York Times>},
    {<response from The Guardian>},
    {<response from ...>}
  ]
}
```

The interface for each response will be:

```typescript
{
  source: string;
  status: string;
  numberHits: number;
  results: [
    {
      publishDate: string;
      type: string;
      section: string;
      title: string;
      url: string;
      author: string;
    },
    {<article 2>},
    {<article 3>},
    ...
  ]
}
```

#### News Save and Retrieve

to be able to save a news article we post request:

```
POST /api/v1/news/save
```

where the request body must have the following info:

```
{
    "url": url;
}
```

the id of the user is encoded into the jwt so there is no need to pass it through the body

validation of url shape is enabled

all saved articles can be retrieved by means of this endpoint:

```
GET /api/v1/news/mysaved
```

the response will contain all the saved articles with the following info:

```typescript
{
    "user_id": number,
    "email": email,
    "articles": [
        {<saved article 1>},
        {<saved article 2>},
        {<saved article 3>},
        ...
    ]
}
```

where each saved article will have the following shape:

```typescript
{
"article_id": number,
"title": string,
"url": url,
"publish_date": Date,
"type": string,
"author": string,
"section": string
}
```

#### user CRUD

crud operations on users is also supported through the endpoints:

```
GET /api/v1/users
GET /api/v1/users/id
PATCH /api/v1/users/id
DELETE /api/v1/users/id
```

where the body for a PATCH request should be:

```typescript
{
    "first_name": string,
    "last_name": string,
    "email": string
}
```

Creation of new users is reserved to authentication endpoints
