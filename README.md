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
# change into Inquisite-Core, cd ../Inquiste-Core from this directory
cd ../Inquiste-Core

#then run neo4j
neo4j start

#then come back to Inquisite-UI
cd ../Inquiste-UI

#then run dev
npm run dev

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
