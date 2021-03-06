module.exports = {
  "oracleDS": {
    "host": "localhost",
    "port": 1521,
    "database": "orcl",
    "username": "ARCTOOLS300",
    "password": "ARCTOOLS300",
    "name": "oracleDS",
    "connector": "oracle",
    "connectionTimeout": 300000000,
    "requestTimeout": 1000000,
    "maxRows": 20000,
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 20000,
      "acquire": 20000
    }
  },
  "mssqlDS": {
    "host": "REDFLT0118",
    "port": 1433,
    "database": "ARCTOOLS300",
    "password": "arceng",
    "name": "mssqlDS",
    "user": "arceng",
    "connector": "mssql",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 20000,
      "acquire": 20000
    }
  },
  "mssqlJDE": {
    "host": "REDFLT0118",
    "port": 1433,
    "database": "JDE_PRIST910",
    "password": "arceng",
    "name": "mssqlJDE",
    "user": "arceng",
    "connector": "mssql",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 20000,
      "acquire": 20000
    },
    "connectionTimeout": 300000
  },
  "MongoDB": {
    "host": "cluster0-shard-00-00-tja6j.mongodb.net",
    "port": 27017,
    "url": "${MONGO_URL}",
    "database": "test",
    "password": "${MONGO_PASS}",
    "name": "MongoDB",
    "connector": "mongodb",
    "user": "${MONGO_USER}",
    "connectionTimeout": 300000000
  },
  "mssqlArchive": {
    "host": "REDFLT0118",
    "port": 1433,
    "database": "JDE_ARCHIVE",
    "password": "arceng",
    "name": "mssqlArchive",
    "connector": "mssql",
    "user": "arceng"
  },
  "mssqlTESTDTA": {
    "host": "REDFLT0118",
    "port": 1433,
    "database": "DTA_TESTDTA_91",
    "password": "arceng",
    "name": "mssqlTESTDTA",
    "connector": "mssql",
    "user": "arceng",
    "connectionTimeout": 300000000,
    "configTimeout": 1000,
    "requestTimeout": 1000000,
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 5000,
      "acquire": 20000,
      "evict": 30000,
      "handleDisconnects": true
    }
  },
  "localDB2": {
    "host": "localhost",
    "port": 50000,
    "database": "mySample",
    "password": "db2inst1-pwd",
    "name": "localDB2",
    "dsn": "",
    "user": "db2inst1",
    "schema": "PRODDTA",
    "connector": "db2"
  }
}
