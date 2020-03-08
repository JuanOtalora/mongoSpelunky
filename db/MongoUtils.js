const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const uri = "mongodb+srv://juan:locobeta661@cluster0-la3ea.mongodb.net/test?retryWrites=true&w=majority";

function MongoUtils() {
  const mu = {}

    mu.databases = {};
    mu.collections ={};

  mu.connect = () => {
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
    return client.connect();
  };

  mu.databases.findAll = query => 
    mu.connect().then(client => {
    const prueba = client.db().admin().listDatabases(); // Returns a promise that will resolve to the list of databases
    return prueba.then(dbs => {
      let arrayDbs = dbs;
      console.log(arrayDbs);
      return arrayDbs;
    }).finally(() => client.close());

  })
    
  mu.databases.findOne = id => 
    mu.connect().then(client => 
    client
      .db()
      .admin()
      .listDatabases() // Returns a promise that will resolve to the list of databases
  )
  .then(dbs => {
    arrayDbs = dbs;
    return arrayDbs
      .findOne({_id: new ObjectID(id)})
    console.log(arrayDbs);
  })
  .finally(() => client.close()); // Closing after getting the data

  mu.collections.findOne = dbName => 
    mu.connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .then(cols => {
        return cols
      })
      .finally(() => client.close());

  mu.collections.findAll = dbName => 
    mu.connect().then(client => {
    const prueba = client.db(dbName).listCollections().toArray(); // Returns a promise that will resolve to the list of databases
    return prueba.then(dbs => {
      let arrayDbs = dbs;
      console.log(arrayDbs);
      return arrayDbs;
    }).finally(() => client.close());

  })      

  mu.collections.findAllRecords = (dbid, colid ) =>
    mu.connect().then(client => {
      const cocktailCol = client.db(dbid).collection(colid);

      // when searching by id we need to create an ObjectID
      return cocktailCol
        .find()
        .limit(20)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

  return mu;


}

module.exports = MongoUtils();
