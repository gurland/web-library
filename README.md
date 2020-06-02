# Web Library

Initially, the web-development coursework and now open-source web based book catalog and library. Now supports only FB2


## Services architecture
```
More service specific info could be found in docker-compose.yml

├── Nginx - used as reverse proxy
│   ├── Frontend - multistage docker build. Builds React SPA and serves artifact using NGINX
│   ├── Api - node.js + express.js RESTful API for accessing books and writing reviews
│   └── Reader - NGINX serves static build of https://github.com/chitalka/reader FB2 reader
├── Mongo - main database, stores user related data and books metadata
└── Books Updater - used to observe directory for .fb2 or .zip files and parse them to MongoDB
```

### Kanban
https://trello.com/b/7lnAwWvv/weblibrary
### OpenAPI Specs
https://app.swaggerhub.com/apis/gurland/web-library/1.0.0
