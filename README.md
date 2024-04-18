## Node GraphQL Service

This repository hosts the implementation of a GraphQL API based on RESTful Blog API, ensuring maximum optimization for queries and mutations. Additionally, the GraphQL N+1 problem is addressed using DataLoader.

Throughout the development process, only GraphQL and DataLoader dependencies are used, adhering to the project's strict dependency requirements.

[Task Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

### How to run

1. Clone this repository.
2. Install dependencies `npm install`.
3. Create `.env` file (based on `.env.example`):

   ```bash
   cp .env.example .env
   ```

4. Create database file, apply migrations and seed the initial data:

   ```bash
   touch prisma/database.db &&
   npx prisma migrate deploy &&
   npx prisma db seed
   ```

5. Run server:
   ```bash
   npm run start
   ```
### Tests

```bash
# queries
npm run test-queries 

# mutations
npm run test-mutations 

# complexity of the graphql queries
npm run test-rule

# n+1 graphql problem
npm run test-loader
npm run test-loader-prime 
```