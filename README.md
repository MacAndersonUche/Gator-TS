# GATOR-TS 

A project on GATOR TS 

## Installation

Run the following to install 

```bash
npm i 
```

Run the following to setup the db 
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo passwd postgres

CREATE DATABASE gator;
```

After setting up the db, create the schema
As seen in the src/schema.ts (Ensure drizzle is installed)

```javascript
import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull().unique(),
});
```
Generate and run the migration 

```bash
    npx drizzle-kit generate
    npx drizzle-kit migrate
```

## Usage
See the index.ts for the various commands 
```javascript
import foobar

npm run start [CMND NAME]
```


## License

[MIT](https://choosealicense.com/licenses/mit/)