const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_DB_URL, { useNewUrlParser: true })

const getCollection = () => {
  return client.db('botatao').collection('reactions')
}

module.exports = { client, getCollection }
