# Botatao

A Discord bot.

## Features

- Save custom reaction combinations and add them to messages

## Deploy

Check current deploy url

```bash
now ls
```

First, take down existing one:

```bash
now scale [deploy-url] sfo1 0
```

Now deploy the new version:

```bash
now --public -e DISCORD_TOKEN="xxx" -e MONGO_DB_URL="xxx"
```

And fix the scale to 1

```bash
now scale [new-deploy-url] sfo1 1
```
