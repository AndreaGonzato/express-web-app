# Docker
to start docker:

```
docker compose up
```

to start in detach mode:

```
docker compose up -d
```

to shut it down

```
docker compose down
```

# Mongo
To lunch mongo open a terminal and run

```
mongo
```

To show all the database loaded on the machine

```
show dbs
```

To select and use one:

```
use <db-name>
```

For a SELECT in a collection:
```
db.<collection-name>.find()
```

## Convention

Naming
use of plural name for Mongo collection


## Observations

Plural of express is expresses

### Data structure
In an user document a record do not know who follow him. But every record store and know who is following.

The in a document user there is no the liked_tweets filed.

## JWT
slide at page 521

in the token i put only the user.id




eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsImlhdCI6MTY3MzAzMDQ1MywiZXhwIjoxNjczMTE2ODUzfQ.
I9vVprGQrgg3AXDWF4tPkQWMWKA8BonyR3qxE7grO7Y"


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsImlhdCI6MTY3MzAzMDQ3NCwiZXhwIjoxNjczMTE2ODc0fQ.
wbUCRc8xm5T6kDpTInjGWZRL63xBUmUlzZdVQrXC9Gg"



continue to improve API 11