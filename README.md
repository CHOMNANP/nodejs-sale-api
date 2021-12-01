api
===

- configure env
- docker-compose up -d
- docker exec -it api bash
    - npx sequelize-cli db:migrate
    - npx sequelize-cli db:seed:all
    - node cmd/generateAdminToken.js 
- run https://localhost:[port]/docs/admin-api
- test api