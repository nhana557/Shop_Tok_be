CREATE TYPE user_role AS ENUM ('admin', 'user', 'super admin');
CREATE TYPE status_transaction AS ENUM ('done', 'pending', 'cancel');


CREATE TABLE "stores" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar,
  "phonenumber" varchar,
  "description" varchar,
  "created_at" timestamp NOT NULL DEFAULT 'now()',
  "isActive" bool DEFAULT true
);

CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "fullname" varchar NOT NULL,
  "varify" bool DEFAULT false,
  "role" user_role NOT NULL,
  "store_id" varchar,
  "created_at" timestamp NOT NULL DEFAULT 'now()',
  "isActive" bool DEFAULT true
);

CREATE TABLE "products" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "stock" int,
  "price" bigint,
  "store_id" varchar,
  "category_id" varchar,
  "image" varchar[],
  "description" varchar,
  "condition" varchar,
  "isActive" bool DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT 'now()'
);

CREATE TABLE "categorys" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "image" varchar,
  "isActive" bool DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT 'now()'
);

CREATE TABLE "address" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "address" varchar,
  "street" varchar,
  "city" varchar,
  "state" varchar,
  "postal_code" varchar,
  "isActive" bool DEFAULT true
);

CREATE TABLE "transactions" (
  "id" varchar PRIMARY KEY,
  "status" status_transaction,
  "total" bigint,
  "shipping_price" bigint,
  "user_id" varchar,
  "product_id" varchar,
  "quanttity" bigint,
  "payment" varchar,
  "isActive" bool DEFAULT true
);

ALTER TABLE "users" ADD FOREIGN KEY ("store_id") REFERENCES "stores" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("store_id") REFERENCES "stores" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categorys" ("id");

ALTER TABLE "address" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");