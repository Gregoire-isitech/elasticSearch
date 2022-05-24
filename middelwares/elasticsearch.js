const { Client } = require('@elastic/elasticsearch')
const config = require('config');
const elasticConfig = config.get('elastic');

const client = new Client({
 node: 'http://localhost:9200',
  auth: {
    apiKey: elasticConfig.apiKey
  }
})

module.exports = client