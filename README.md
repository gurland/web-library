# Web Library

Initially, the web-development coursework and now open-source web based book catalog and library. Supports only FB2.


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

## Requirements
Docker
Docker-Compose

## Deployment
`docker-compose up`

## Usage
Put any valid FictionBook2 e-book (or zipped version of it) to `/srv/upload` (mountpoint for upload volume is configured in `docker-compose.yml`).
Then book could be found using search form on main page.

## Contributing
### Pull Request Process
1. Create or take an existing issue
2. Fork this repository (if you are not a contributor)
3. `git checkout -b dev-N dev`, where N is the number of issue you are solving.
4. Make pull request in which you describe what've you done and specify issue number.

## References

### Kanban
https://trello.com/b/7lnAwWvv/weblibrary
### OpenAPI Specs & Docs
https://app.swaggerhub.com/apis/gurland/web-library/1.0.0
