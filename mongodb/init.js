// connect to admin database to create users
db = new Mongo().getDB("admin");

// create admin user
db.createUser({
  user: "adminUser",
  pwd: "adminPassword",
  roles: [
    {
      role: "clusterAdmin",
      db: "admin",
    },
  ],
});

// authenticate with admin user
db.auth("adminUser", "adminPassword");

// switch to library_books database
db = db.getSiblingDB("library_books");

// create non admin user in library_books database (used in book microservice)
db.createUser({
  user: "bookuser",
  pwd: "book123",
  roles: [
    {
      role: "dbOwner",
      db: "library_books",
    },
  ],
});

// switch to library_customers database
db = db.getSiblingDB("library_customers");

// create non admin user in library_customers database (used in customer microservice)
db.createUser({
  user: "customeruser",
  pwd: "customer123",
  roles: [
    {
      role: "dbOwner",
      db: "library_customers",
    },
  ],
});

// switch to library_orders database
db = db.getSiblingDB("library_orders");

// create non admin user in library_orders database (used in order microservice)
db.createUser({
  user: "orderuser",
  pwd: "order123",
  roles: [
    {
      role: "dbOwner",
      db: "library_orders",
    },
  ],
});