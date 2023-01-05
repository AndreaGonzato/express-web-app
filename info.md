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
