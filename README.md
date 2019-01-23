# inquisite-ui

> Frontend for inqusite core

## Build Setup


``` bash
# setup Inquisite config with local settings
cp config.js-dist config.js

# ... then edit to point to Inquisite-core services (https://github.com/inquisite/Inquisite-Core)

# Install dependencies
npm install

# Serve with hot reload at localhost:8080
npm run dev

# ... or build for production with minification
npm run build
```

## Run with all installations already installed


``` bash
#run neo4j
neo4j start

# change into Inquisite-Core, cd ../Inquiste-Core from this directory

cd ../Inquiste-Core
python2.7 app.py

#then come back to Inquisite-UI
cd ../Inquiste-UI

#then run dev
npm run dev

#then authentification fix: we have to go to the neo4j web services and
# manually set up a new password (we chose hello) then we update that to the config
# file for the following entities -->   "database_user": "neo4j", "database_pass": "hello",
# then we save that and re run .

#then run dev again
npm run dev

#now we need to download elastic search with brew
brew install elasticsearch

# now we need to dowload 3 elasticsearch plugins from this link https://graphaware.com/products/
# we will need 1) GraphAware Framework, 2) GraphAware Neo4j2Elastic, 3) GraphAware UUID
# under each, click on download to download and readme for specfic download instructions

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
