# Back MakeYourDish

MakeYourDish propose des recettes de plats et de cocktails en fonction des ingrédients stipulé

## Getting Started

### StartUp prisma and database

Use sql query to create a new database called makeyourdish

Change or put in .env file the DATABASE_URL and the name and the password

DATABASE_URL="postgresql://name:password@localhost:5432/dbname?schema=public"

Use the command:
            npx prisma db push

If the prisma schema is not push in the database use this command:
            npx prisma migrate dev

### Prisma Commande !!

Commands

            init   Set up Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)
              db   Manage your database schema and lifecycle
         migrate   Migrate your database
          studio   Browse your data with Prisma Studio
          format   Format your schema

Flags

     --preview-feature   Run Preview Prisma commands

Examples

Set up a new Prisma project
$ prisma init

Generate artifacts (e.g. Prisma Client)
$ prisma generate

Browse your data
$ prisma studio

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ prisma migrate dev

Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

Push the Prisma schema state to the database
$ prisma db push

## Building / Testing

```
A COMPLETER
```

## Authors:

- GIL AMARO Dylan
- MARQUET Pierre
- BIDAULT Romain
- RIGAL Geoffrey
