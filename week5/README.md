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

An API key must be provided for both news API's

### Endpoints

Currently there is only one endpoint available, it requires two query parameters to be provided (validated on start)

```

/api/v1/news?q=<query string>&source=<nyt|guardian|both>

```

### Response

If able to connect to the API the response can be from one or both of the APIs with the following interface:

```JSON
{ data:
  [
    {<response from The New York Times>},
    {<response from The Guardian>}
  ]
}
```

The interface for each response will be:

```JSON
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
