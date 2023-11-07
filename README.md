# graphql-yoga-response-caching

Graphql Yoga Response Caching

```
npm install

npm run dev
```

##### Sample Queries

```graphql
query {
  slow
}
```

##### Query with response caching

> Note: The first request will take 5 seconds, but the subsequent requests will be fast

```bash
curl -X POST -H 'Content-Type: application/json' http://localhost:4000 \
  -d '{"query":"{slow}"}' -w '\nTotal time : %{time_total}'
```
